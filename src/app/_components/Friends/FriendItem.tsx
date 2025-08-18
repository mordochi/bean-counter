import { Friend } from ".";

export default function FriendItem({
  friend,
  onSelect,
  index,
}: {
  friend: Friend;
  onSelect: (id: string) => void;
  index: number;
}) {
  return (
    <div
      key={friend.friend_id}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-r from-white/80 to-white/60 p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
      onClick={() => onSelect(friend.friend_id)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-purple-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-5">
          {/* Avatar with better gradient */}
          <div className="relative">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 p-0.5 shadow-lg">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-white text-lg font-bold text-purple-600">
                {friend.friend_email.charAt(0).toUpperCase()}
              </div>
            </div>
            {/* Online indicator */}
            <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-400 shadow-sm"></div>
          </div>

          {/* Friend info */}
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-800 transition-colors group-hover:text-purple-700">
              {friend.friend_email}
            </h4>
            <p className="flex items-center gap-1 text-sm text-gray-500">
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Friends since{" "}
              {new Date(friend.friendship_created_at).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  year: "numeric",
                },
              )}
            </p>
          </div>
        </div>

        {/* Select button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(friend.friend_id);
          }}
          className="btn-primary px-6 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
        >
          Select
        </button>
      </div>
    </div>
  );
}
