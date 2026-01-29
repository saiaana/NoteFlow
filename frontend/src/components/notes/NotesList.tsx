import { Stack } from "@mui/material";
import NoteCard from "@/components/notes/NoteCard";
import { Note } from "@/types/note";

type NotesListProps = {
  notes: Note[];
};

export default function NotesList({ notes }: NotesListProps) {
  return (
    <Stack spacing={3}>
      {notes.map((note) => (
        <NoteCard note={note} key={note._id} />
      ))}
    </Stack>
  );
}
