export default function Error({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div
      className={`mb-4 rounded-2xl border p-4 ${
        message.includes("accepted") || message.includes("rejected")
          ? "border-green-200 bg-green-50 text-green-700"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      <p className="text-sm">{message}</p>
    </div>
  );
}
