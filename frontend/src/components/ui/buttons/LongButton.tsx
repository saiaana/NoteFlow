import { Button, ButtonProps } from "@mui/material";

type LongButtonProps = {
  buttonText: string;
  type?: "button" | "submit";
  variant?: ButtonProps["variant"];
  color?: ButtonProps["color"];
  disabled?: boolean;
  onClick?: () => void;
};

export default function LongButton({
  buttonText,
  type = "submit",
  variant = "contained",
  color = "primary",
  disabled = false,
  onClick,
}: LongButtonProps) {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      disabled={disabled}
      onClick={onClick}
      fullWidth
      size="large"
    >
      {buttonText}
    </Button>
  );
}
