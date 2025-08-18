export default function Instructions() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-blue-50/80 to-white/95 p-6">
      <h3 className="mb-3 font-semibold text-gray-800">How to Add Friends</h3>
      <ul className="space-y-2 text-sm text-gray-600">
        <li className="flex items-center gap-2">
          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent"></span>
          <span>Enter a user ID (format: user_xxxxx) or email address</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent"></span>
          <span>Click &quot;Send Friend Request&quot; to invite them</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent"></span>
          <span>
            They&apos;ll receive a notification to accept your request
          </span>
        </li>
      </ul>
    </div>
  );
}
