import { Box, Button, ButtonProps, SxProps, Theme } from "@mui/material";
import Link from "next/link";

type ShortButtonProps = {
  buttonText: string;
  variant?: ButtonProps["variant"];
  color?: ButtonProps["color"];
  size?: ButtonProps["size"];
  startIcon?: ButtonProps["startIcon"];
  endIcon?: ButtonProps["endIcon"];
  customStyles?: SxProps<Theme>;
  navigateTo?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function ShortButton({
  buttonText,
  variant = "contained",
  color,
  size = "medium",
  startIcon,
  endIcon,
  customStyles,
  navigateTo,
  onClick,
}: ShortButtonProps) {
  const isLink = !!navigateTo;

  return (
    <Box>
      <Button
        variant={variant}
        color={color}
        size={size}
        startIcon={startIcon}
        endIcon={endIcon}
        component={isLink ? Link : "button"}
        sx={customStyles}
        {...(onClick ? { onClick } : { href: navigateTo || "#" })}
      >
        {buttonText}
      </Button>
    </Box>
  );
}
