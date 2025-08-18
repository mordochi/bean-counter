"use client";
import { useEffect, useState } from "react";
import SupabaseClient from "@/lib/supabaseClient";
import ErrorMessage from "./Error";
import Loading from "./Loading";
import NoRequests from "./NoRequests";
import Request from "./Request";

interface PendingRequest {
  friendship_id: string;
  requester_id: string;
  requester_email: string;
  created_at: string;
}

export default function PendingRequests() {
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState("");

  const fetchPendingRequests = async () => {
    try {
      const { data, error } = await SupabaseClient.rpc(
        "get_pending_friendship_requests",
      );

      if (error) {
        throw error;
      }

      setPendingRequests(data || []);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
      setMessage("Failed to load pending requests");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleAccept = async (friendshipId: string) => {
    setProcessingIds((prev) => new Set(prev).add(friendshipId));
    setMessage("");

    try {
      const { error } = await SupabaseClient.rpc("accept_friendship_request", {
        friendship_id: friendshipId,
      });

      if (error) {
        throw error;
      }

      setMessage("Friend request accepted!");
      // Remove the accepted request from the list
      setPendingRequests((prev) =>
        prev.filter((req) => req.friendship_id !== friendshipId),
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to accept friend request. Please try again.";
      setMessage(errorMessage);
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(friendshipId);
        return newSet;
      });
    }
  };

  const handleReject = async (friendshipId: string) => {
    setProcessingIds((prev) => new Set(prev).add(friendshipId));
    setMessage("");

    try {
      const { error } = await SupabaseClient.rpc("reject_friendship_request", {
        friendship_id: friendshipId,
      });

      if (error) {
        throw error;
      }

      setMessage("Friend request rejected");
      // Remove the rejected request from the list
      setPendingRequests((prev) =>
        prev.filter((req) => req.friendship_id !== friendshipId),
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to reject friend request. Please try again.";
      setMessage(errorMessage);
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(friendshipId);
        return newSet;
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mb-8 rounded-3xl border border-orange-200/30 bg-gradient-to-br from-white/95 to-orange-50/80 p-8 shadow-2xl backdrop-blur-2xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 shadow-lg">
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          Pending Friend Requests
          {pendingRequests.length > 0 && (
            <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-white">
              {pendingRequests.length}
            </span>
          )}
        </h2>
      </div>

      {/* Message Display */}
      <ErrorMessage message={message} />

      {!pendingRequests.length ? (
        <NoRequests />
      ) : (
        <div className="space-y-4">
          {pendingRequests.map((request) => {
            const isProcessing = processingIds.has(request.friendship_id);
            return (
              <Request
                key={request.friendship_id}
                request={request}
                onAccept={handleAccept}
                onReject={handleReject}
                isProcessing={isProcessing}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
