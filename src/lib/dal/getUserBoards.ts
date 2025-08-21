import "server-only";
import { createClient } from "@/lib/supabaseServer";
import { Database, Tables } from "../../../database.types";
import { verifySession } from "./index";

export type UserBoard = Tables<"shared_boards"> & {
  friend: {
    id: string;
    name: string;
    avatar: string;
    email: string;
  };
};

export async function getUserBoards(): Promise<UserBoard[]> {
  const session = await verifySession();

  if (!session) {
    return [];
  }

  const client = await createClient();

  // Query shared_boards where the current user is either user1_id or user2_id
  const { data: boards, error } = await client
    .from("shared_boards")
    .select("*")
    .or(`user1_id.eq.${session.userId},user2_id.eq.${session.userId}`);

  if (error) {
    console.error("Error fetching user boards:", error);
    return [];
  }

  if (!boards) {
    return [];
  }

  // Get friends data
  const { data: friends, error: friendsError } =
    await client.rpc("get_user_friends");

  if (friendsError) {
    console.error("Error fetching friends:", friendsError);
    return [];
  }

  // Create a map of friend_id to friend data for quick lookup
  const friendsMap = new Map(
    friends?.map(
      (
        friend: Database["public"]["Functions"]["get_user_friends"]["Returns"][0],
      ) => [
        friend.friend_id,
        {
          id: friend.friend_id,
          name: friend.friend_name || friend.friend_email,
          avatar: friend.friend_avatar || "",
          email: friend.friend_email,
        },
      ],
    ) || [],
  );

  return boards.map((board) => {
    const friend_id =
      board.user1_id === session.userId ? board.user2_id : board.user1_id;
    return {
      ...board,
      friend: friendsMap.get(friend_id) || {
        id: friend_id,
        name: "",
        avatar: "",
        email: "",
      },
    };
  });
}
