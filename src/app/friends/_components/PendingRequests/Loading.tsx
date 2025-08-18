export default function Loading() {
  return (
    <div className="mb-8 rounded-3xl border border-purple-200/30 bg-gradient-to-br from-white/95 to-purple-50/80 p-8 shadow-2xl backdrop-blur-2xl">
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-300 border-t-purple-600"></div>
        <span className="ml-3 text-gray-600">Loading pending requests...</span>
      </div>
    </div>
  );
}
