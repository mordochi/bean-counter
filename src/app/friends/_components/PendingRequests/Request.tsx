interface PendingFriendshipRequest {
  friendship_id: string;
  requester_id: string;
  requester_email: string;
  created_at: string;
}

interface RequestProps {
  request: PendingFriendshipRequest;
  onAccept: (friendshipId: string) => void;
  onReject: (friendshipId: string) => void;
  isProcessing: boolean;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-TW", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function Request({
  request,
  onAccept,
  onReject,
  isProcessing,
}: RequestProps) {
  return (
    <div
      key={request.friendship_id}
      className="flex items-center justify-between rounded-2xl border border-orange-100 bg-white/60 p-4 shadow-sm"
    >
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-50 to-orange-100">
            <svg
              className="h-5 w-5 text-orange-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {request.requester_email}
            </p>
            <p className="text-sm text-gray-500">
              Sent {formatDate(request.created_at)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onAccept(request.friendship_id)}
          disabled={isProcessing}
          className="btn-accent rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {isProcessing ? (
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 animate-spin rounded-full border border-white/30 border-t-white"></div>
              <span>...</span>
            </div>
          ) : (
            "Accept"
          )}
        </button>

        <button
          onClick={() => onReject(request.friendship_id)}
          disabled={isProcessing}
          className="rounded-xl bg-gradient-to-r from-gray-400 to-gray-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:from-gray-500 hover:to-gray-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {isProcessing ? (
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 animate-spin rounded-full border border-white/30 border-t-white"></div>
              <span>...</span>
            </div>
          ) : (
            "Reject"
          )}
        </button>
      </div>
    </div>
  );
}
