"use client";
import { useRouter } from "next/navigation";
import { Typography, useTheme } from "@mui/material";
import { useAuthStore } from "@/store/useAuthStore";

export default function NoteFlowLogo() {
  const { user } = useAuthStore();
  const router = useRouter();
  const theme = useTheme();

  const isDark = theme.palette.mode === "dark";

  const navigateTo = user ? "/" : "/";

  return (
    <Typography
      variant="h6"
      fontWeight="bold"
      sx={{ color: isDark ? "white" : "black", cursor: "pointer" }}
      onClick={() => router.push(navigateTo)}
    >
      NoteFlow
    </Typography>
  );
}
