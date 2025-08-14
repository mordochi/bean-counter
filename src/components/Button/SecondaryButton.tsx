"use client";

export default function SecondaryButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="btn-secondary flex items-center gap-2 text-lg"
    >
      {children}
    </button>
  );
}
