import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function Button({
  type,
  ...props
}: { type: "primary" | "secondary" } & Parameters<typeof PrimaryButton>[0]) {
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
