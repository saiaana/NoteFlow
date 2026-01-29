import { useModalStore } from "@/store/useModalStore";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { ArrowBack, Edit, Delete } from "@mui/icons-material";
import ShortButton from "@/components/ui/buttons/ShortButton";

type NoteActionsProps = { noteId: string };

export default function NoteActions({ noteId }: NoteActionsProps) {
  const router = useRouter();
  
  const { openDeleteModal } = useModalStore();

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <ShortButton
        buttonText="Back to Notes"
        variant="outlined"
        size="medium"
        startIcon={<ArrowBack />}
        onClick={() => router.push("/notes")}
      />

      <Stack direction="row" spacing={2} sx={{ mt: { xs: 1, sm: 0 } }}>
        <ShortButton
          buttonText="Edit"
          variant="contained"
          size="medium"
          startIcon={<Edit />}
          onClick={() => router.push(`/edit-note/${noteId}`)}
        />
        <ShortButton
          buttonText="Delete"
          variant="contained"
          color="error"
          size="medium"
          startIcon={<Delete />}
          onClick={() => openDeleteModal(noteId)}
        />
      </Stack>
    </Box>
  );
}
