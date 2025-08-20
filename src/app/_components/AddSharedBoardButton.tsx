"use client";
import { useState } from "react";
import Button from "@/components/Button";
import SupabaseClient from "@/lib/supabaseClient";
import BoardNameModal from "./BoardNameModal";
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
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);

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

  const createSharedBoard = async (friendId: string, boardName: string) => {
    const { data, error } = await SupabaseClient.rpc("create_shared_board", {
      friend_id: friendId,
      p_board_name: boardName,
    });
    if (error) {
      throw new Error(error.message || "Failed to create shared board");
    }
    return data;
  };

  const handleSelectFriend = (id: string) => {
    setSelectedFriendId(id);
    setIsModalOpen(true);
  };

  const handleConfirmBoardName = async (boardName: string) => {
    if (!selectedFriendId) {
      return;
    }

    setIsCreatingBoard(true);
    setIsModalOpen(false);
    try {
      await createSharedBoard(selectedFriendId, boardName);
      setShowFriendsList(false);
      setSelectedFriendId(null);
      setError(null);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create shared board",
      );
    } finally {
      setIsCreatingBoard(false);
    }
  };

  const handleCancelBoardName = () => {
    setIsModalOpen(false);
    setSelectedFriendId(null);
  };

  if (showFriendsList) {
    return (
      <>
        <FriendList
          friends={friends}
          onSelect={handleSelectFriend}
          onClose={() => setShowFriendsList(false)}
          isLoading={isLoading}
        />
        {isCreatingBoard && (
          <div style={{ padding: "1rem", textAlign: "center" }}>
            Creating shared board...
          </div>
        )}
        {error && (
          <div style={{ padding: "1rem", color: "red", textAlign: "center" }}>
            {error}
          </div>
        )}
        <BoardNameModal
          isOpen={isModalOpen}
          onConfirm={handleConfirmBoardName}
          onClose={handleCancelBoardName}
        />
      </>
    );
  }

  return (
    <Button type="primary" onClick={handlePickFriend}>
      Pick a Friend from Your List
    </Button>
  );
}
