"use client";
import { ButtonProps } from "./index";

export default function PrimaryButton({
  onClick,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="btn-primary transform px-12 py-4 text-xl transition-all duration-300 hover:scale-105"
      {...rest}
    >
      {children}
    </button>
  );
}
