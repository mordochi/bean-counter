import { ButtonHTMLAttributes } from "react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export default function Button({
  type,
  ...props
}: {
  type: "primary" | "secondary";
} & ButtonProps) {
  let ButtonComponent;
  switch (type) {
    case "primary":
      ButtonComponent = PrimaryButton;
      break;
    case "secondary":
      ButtonComponent = SecondaryButton;
      break;
  }

  return <ButtonComponent {...props} />;
}
