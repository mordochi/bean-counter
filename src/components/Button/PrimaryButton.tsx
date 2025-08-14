"use client";

export default function PrimaryButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="btn-primary transform px-12 py-4 text-xl transition-all duration-300 hover:scale-105"
    >
      {children}
    </button>
  );
}
