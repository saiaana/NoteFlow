import { Stack, Typography } from "@mui/material";
import { useAuthStore } from "@/store/useAuthStore";
import { Note } from "../../types/note";

type NoteMetaDataProps = {
  note: Note;
};

export default function NoteMetaData({ note }: NoteMetaDataProps) {
  const { getDisplayName } = useAuthStore();

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography variant="body2" color="text.secondary">
        Author: {getDisplayName()}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Created: {new Date(note.createdAt).toLocaleString()}
      </Typography>
    </Stack>
  );
}
