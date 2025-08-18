import FriendItem from "./FriendItem";
import FriendsLayout from "./FriendsLayout";
import LoadingSkeletons from "./LoadingSkeletons";
import NoFriends from "./NoFriends";

export interface Friend {
  friend_id: string;
  friend_email: string;
  friendship_created_at: string;
}

export default function Friends({
  friends,
  onSelect,
  onClose,
  isLoading,
}: {
  friends: Friend[];
  onSelect: (id: string) => void;
  onClose: () => void;
  isLoading?: boolean;
}) {
  return (
    <FriendsLayout onClose={onClose}>
      {isLoading ? (
        <LoadingSkeletons />
      ) : !friends.length ? (
        <NoFriends />
      ) : (
        <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-200 max-h-96 space-y-4 overflow-y-auto pr-2">
          {friends.map((friend, index) => (
            <FriendItem
              key={friend.friend_id}
              friend={friend}
              onSelect={onSelect}
              index={index}
            />
          ))}
        </div>
      )}
    </FriendsLayout>
  );
}
