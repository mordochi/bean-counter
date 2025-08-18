function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="group flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-100/80 text-gray-500 transition-all duration-200 hover:scale-105 hover:bg-red-100 hover:text-red-600"
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

export default function FriendsLayout({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-purple-200/30 bg-gradient-to-br from-white/95 to-purple-50/80 p-8 shadow-2xl backdrop-blur-2xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg">
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
          <div>
            <h3 className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-2xl font-bold text-transparent">
              Select a Friend
            </h3>
            <p className="text-sm text-gray-600">
              Choose someone to share expenses with
            </p>
          </div>
        </div>
        <CloseButton onClose={onClose} />
      </div>

      {children}
    </div>
  );
}
