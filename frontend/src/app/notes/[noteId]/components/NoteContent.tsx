import { Note } from "@/types/note";
import { Typography, Box, useTheme } from "@mui/material";

type NoteContentProps = { note: Note };

export default function NoteContent({ note }: NoteContentProps) {
  const theme = useTheme();

  return (
    <Box sx={theme.custom.card}>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          textAlign: "justify",
        }}
      >
        {note.content}
      </Typography>
    </Box>
  );
}
