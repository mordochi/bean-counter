"use client";
import { useState } from "react";
import SupabaseClient from "@/lib/supabaseClient";
import Instructions from "./Instructions";

const isValidInput = (input: string) => {
  // Check if it's an email or UUID format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return emailRegex.test(input) || uuidRegex.test(input) || input.length > 3;
};

const isEmail = (input: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
};

export default function AddAFriend() {
  const [friendInput, setFriendInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  const handleAddFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendInput.trim()) return;

    setIsLoading(true);
    setMessage("");

    try {
      let error;

      if (isEmail(friendInput)) {
        const result = await SupabaseClient.rpc(
          "add_friendship_request_by_email",
          { friend_email: friendInput },
        );
        error = result.error;
      } else {
        const result = await SupabaseClient.rpc("add_friendship_request", {
          friend_user_id: friendInput,
        });
        error = result.error;
      }

      if (error) {
        throw error;
      }

      setMessage(`Friend request sent to ${friendInput}`);
      setFriendInput("");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send friend request. Please try again.";
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-8 rounded-3xl border border-purple-200/30 bg-gradient-to-br from-white/95 to-purple-50/80 p-8 shadow-2xl backdrop-blur-2xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-green-600 shadow-lg">
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Add Friend</h2>
      </div>

      <form onSubmit={handleAddFriend} className="space-y-4">
        <div>
          <label
            htmlFor="friendInput"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            User ID or Email Address
          </label>
          <input
            id="friendInput"
            type="text"
            value={friendInput}
            onChange={(e) => setFriendInput(e.target.value)}
            placeholder="Enter user ID (e.g., c0e4b719-e594-4436-a077-2994fdc5a0e3) or email address"
            className="w-full rounded-2xl border border-purple-200/50 bg-white/80 px-4 py-3 text-gray-800 placeholder-gray-200 shadow-sm transition-all duration-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none"
            disabled={isLoading}
          />
          <p className="mt-1 text-xs text-gray-500">
            You can add friends using their user ID or email address
          </p>
        </div>

        <button
          type="submit"
          disabled={!isValidInput(friendInput) || isLoading}
          className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-purple-600 hover:to-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
              Sending Request...
            </div>
          ) : (
            "Send Friend Request"
          )}
        </button>
      </form>

      {/* Message Display */}
      {message && (
        <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4">
          <p className="text-sm text-green-700">{message}</p>
        </div>
      )}

      {/* Instructions Toggle */}
      <div className="mt-4">
        <button
          onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
          className="flex w-full items-center justify-between rounded-2xl text-left transition-all duration-200"
        >
          <span className="text-sm font-medium text-gray-700">
            How to Add Friends
          </span>
          <svg
            className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
              isInstructionsOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isInstructionsOpen
              ? "mt-2 max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <Instructions />
        </div>
      </div>
    </div>
  );
}
