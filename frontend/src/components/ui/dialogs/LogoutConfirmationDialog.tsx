"use client";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  useTheme,
} from "@mui/material";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import { useAuthStore } from "@/store/useAuthStore";
import { useModalStore } from "@/store/useModalStore";

import ShortButton from "../buttons/ShortButton";

export default function LogoutConfirmationDialog() {
  const theme = useTheme();
  const router = useRouter();

  const { isLogoutModalOpen, closeLogoutModal } = useModalStore();
  const { logout, isDemoUser } = useAuthStore();

  const demo = isDemoUser();

  const mode = demo
    ? {
        icon: WarningAmberRoundedIcon,
        iconColor: theme.palette.warning.main,
        buttonBg: theme.custom.dialogGradients.demoLogout,
        buttonHoverBg: theme.custom.dialogGradients.demoLogoutHover,
        buttonActionText: "Exit",
        modalTitle: "Exit Demo Mode",
        modalDescription:
          "Leaving demo mode will delete your temporary notes and return you to the main page.",
      }
    : {
        icon: LogoutRoundedIcon,
        iconColor: theme.palette.error.main,
        buttonBg: theme.custom.dialogGradients.red,
        buttonHoverBg: theme.custom.dialogGradients.redHover,
        buttonActionText: "Log Out",
        modalTitle: "Log Out",
        modalDescription: "Are you sure you want to log out?",
      };

  const ModeIcon = mode.icon;

  const handleConfirm = async () => {
    closeLogoutModal();
    await logout();
    router.push("/");
  };

  return (
    <Dialog
      open={isLogoutModalOpen}
      onClose={closeLogoutModal}
      PaperProps={{ sx: theme.custom.dialogPaper }}
      sx={{ "& .MuiBackdrop-root": theme.custom.dialogBackdrop }}
    >
      <Stack spacing={2} alignItems="center" sx={{ pt: 1 }}>
        <ModeIcon
          sx={{
            fontSize: 52,
            color: mode.iconColor,
          }}
        />

        <DialogTitle
          id="alert-dialog-title"
          variant="h6"
          fontWeight={700}
          sx={{
            p: 0,
            color: theme.palette.primary.main,
          }}
        >
          {mode.modalTitle}
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "text.secondary", px: 2 }}
          >
            {mode.modalDescription}
          </DialogContentText>
        </DialogContent>
      </Stack>

      <DialogActions sx={theme.custom.dialogActions}>
        <ShortButton
          buttonText="Cancel"
          onClick={closeLogoutModal}
          customStyles={{ width: 120 }}
        />
        <ShortButton
          buttonText={mode.buttonActionText}
          onClick={handleConfirm}
          customStyles={{
            background: mode.buttonBg,
            "&:hover": {
              background: mode.buttonHoverBg,
            },
            width: 120,
          }}
        />
      </DialogActions>
    </Dialog>
  );
}
