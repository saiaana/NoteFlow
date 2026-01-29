import NoteMetaData from "@/components/notes/NoteMetaData";
import { Note } from "@/types/note";
import { Stack, Typography, Box, useTheme } from "@mui/material";

type NoteHeaderProps = {
  note: Note;
};

export default function NoteHeader({ note }: NoteHeaderProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Stack spacing={2} sx={theme.custom.card}>
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{
          color: isDark
            ? theme.palette.primary.light
            : theme.palette.primary.dark,
          textShadow: theme.shadows[isDark ? 2 : 1],
          lineHeight: 1.3,
          wordBreak: "break-word",
        }}
      >
        {note.title}
      </Typography>

      <Box sx={{ opacity: isDark ? 0.85 : 0.9 }}>
        <NoteMetaData note={note} />
      </Box>
    </Stack>
  );
}
