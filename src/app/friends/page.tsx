import AddAFriend from "./_components/AddAFriend";
import MyID from "./_components/MyID";
import PendingRequests from "./_components/PendingRequests";

export default function FriendsPage() {
  return (
    <div className="mx-auto min-h-screen max-w-2xl p-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Friends</h1>
        <p className="text-gray-600">Manage your connections</p>
      </div>

      {/* Current User ID Display */}
      <MyID id={"12jnndeh"} />

      {/* Add Friend Form */}
      <AddAFriend />

      {/* Pending Friend Requests */}
      <PendingRequests />
    </div>
  );
}
