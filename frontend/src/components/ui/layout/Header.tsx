"use client";
import { AppBar, Toolbar } from "@mui/material";
import NoteFlowLogo from "./NoteFlowLogo";
import { useAuthStore } from "@/store/useAuthStore";
import ShortButton from "../buttons/ShortButton";
import { useModalStore } from "@/store/useModalStore";

export default function Header() {
  const { user, isInitialized } = useAuthStore();
  const { openLogoutModal } = useModalStore();

  // Don't show user until auth check is complete
  const shouldShowUser = isInitialized && user;
  const isDemo = shouldShowUser && user?.role === "demo-user";
  const buttonText = isDemo ? "Exit Demo" : "Log out";

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <NoteFlowLogo />
        {shouldShowUser && (
          <ShortButton
            buttonText={buttonText}
            variant="text"
            onClick={openLogoutModal}
            size="large"
          />
        )}
      </Toolbar>
    </AppBar>
  );
}
