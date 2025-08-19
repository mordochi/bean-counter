export default function LoadingSkeletons() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-2xl bg-white/60 p-6"
        >
          <div className="h-14 w-14 animate-pulse rounded-full bg-gradient-to-br from-purple-200 to-purple-300"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-3 w-1/2 animate-pulse rounded-lg bg-gray-200"></div>
          </div>
          <div className="h-10 w-20 animate-pulse rounded-xl bg-purple-200"></div>
        </div>
      ))}
    </div>
  );
}
