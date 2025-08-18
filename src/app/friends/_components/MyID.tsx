export default function MyID({ id }: { id: string }) {
  return (
    <div className="mb-8 rounded-3xl border border-purple-200/30 bg-gradient-to-br from-white/95 to-purple-50/80 p-6 shadow-lg backdrop-blur-2xl">
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Your User ID</p>
          <p className="font-mono text-lg font-semibold text-gray-800">{id}</p>
        </div>
      </div>
    </div>
  );
}
