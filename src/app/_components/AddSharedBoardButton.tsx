"use client";
import { useState } from "react";
import Button from "@/components/Button";
import SupabaseClient from "@/lib/supabaseClient";
import FriendList from "./FriendList";

interface Friend {
  friend_id: string;
  friend_email: string;
  friendship_created_at: string;
}

export default function AddSharedBoardButton() {
  const [showFriendsList, setShowFriendsList] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFriends = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await SupabaseClient.rpc("get_user_friends");
      if (error) {
        console.error("Error fetching friends:", error);
        return;
      }
      setFriends(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePickFriend = async () => {
    setShowFriendsList(true);
    await fetchFriends();
  };

  const handleSelectFriend = (id: string) => {
    // TODO: Create shared board with selected friend
    console.log("Selected friend id:", id);
    setShowFriendsList(false);
  };

  if (showFriendsList) {
    return (
      <FriendList
        friends={friends}
        onSelect={handleSelectFriend}
        onClose={() => setShowFriendsList(false)}
        isLoading={isLoading}
      />
    );
  }

  return (
    <Button type="primary" onClick={handlePickFriend}>
      Pick a Friend from Your List
    </Button>
  );
}
