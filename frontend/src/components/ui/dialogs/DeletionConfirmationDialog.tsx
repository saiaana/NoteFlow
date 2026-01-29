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
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import ShortButton from "../buttons/ShortButton";

import { useModalStore } from "@/store/useModalStore";
import { useNoteStore } from "@/store/useNotesStore";

export default function DeletionConfirmationDialog() {
  const theme = useTheme();
  const router = useRouter();

  const { isDeleteModalOpen, closeDeleteModal, noteId } = useModalStore();
  const { deleteNote } = useNoteStore();

  const handleConfirm = async () => {
    if (!noteId) return;
    const res = await deleteNote(noteId);
    if (res.success) {
      closeDeleteModal();
      router.push("/notes");
      router.refresh();
    } else {
      console.error("Failed to delete note");
    }
  };

  return (
    <Dialog
      open={isDeleteModalOpen}
      onClose={closeDeleteModal}
      PaperProps={{ sx: theme.custom.dialogPaper }}
      sx={{ "& .MuiBackdrop-root": theme.custom.dialogBackdrop }}
    >
      <Stack alignItems="center" spacing={2} sx={{ mt: 1 }}>
        <WarningAmberRoundedIcon
          sx={{
            fontSize: 50,
            color: theme.palette.error.main,
          }}
        />

        <DialogTitle
          id="alert-dialog-title"
          variant="h6"
          fontWeight={700}
          sx={{ color: theme.palette.error.main, p: 0 }}
        >
          Delete note?
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              color: "text.secondary",
              px: 2,
            }}
          >
            This action cannot be undone. The note will be permanently deleted.
          </DialogContentText>
        </DialogContent>
      </Stack>

      <DialogActions sx={theme.custom.dialogActions}>
        <ShortButton
          variant="outlined"
          buttonText="Cancel"
          onClick={closeDeleteModal}
          customStyles={{ width: 120 }}
        />

        <ShortButton
          buttonText="Delete"
          onClick={handleConfirm}
          customStyles={{
            width: 120,
            background: theme.custom.dialogGradients.red,
            "&:hover": {
              background: theme.custom.dialogGradients.redHover,
            },
          }}
        />
      </DialogActions>
    </Dialog>
  );
}
