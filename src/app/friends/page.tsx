import { createClient } from "@/lib/supabaseServer";
import AddAFriend from "./_components/AddAFriend";
import MyID from "./_components/MyID";
import PendingRequests from "./_components/PendingRequests";

export default async function FriendsPage() {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  return (
    <div className="mx-auto min-h-screen max-w-2xl p-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Friends</h1>
        <p className="text-gray-600">Manage your connections</p>
      </div>

      {/* @todo: make sure the user is logging in before showing the page */}
      {/* Current User ID Display */}
      <MyID id={user!.id} />

      {/* Add Friend Form */}
      <AddAFriend />

      {/* Pending Friend Requests */}
      <PendingRequests />
    </div>
  );
}
