"use client";
import { ButtonProps } from "./index";

export default function SecondaryButton({
  onClick,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="btn-secondary flex items-center gap-2 text-lg"
      {...rest}
    >
      {children}
    </button>
  );
}
