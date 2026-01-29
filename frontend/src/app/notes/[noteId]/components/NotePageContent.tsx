"use client";

import { Divider, Stack } from "@mui/material";
import { Note } from "@/types/note";
import NoteHeader from "./NoteHeader";
import NoteContent from "./NoteContent";
import NoteActions from "./NoteActions";
import NoteTagList from "@/components/notes/NoteTagList";
import { AppContainer } from "@/components/ui/containers/AppContainer";

type NotePageContainerProps = {
  note: Note;
};

export default function NotePageContent({ note }: NotePageContainerProps) {
  return (
    <AppContainer maxWidth="md">
      <Stack spacing={3}>
        <NoteHeader note={note} />
        <Divider />
        <NoteContent note={note} />
        <NoteTagList note={note} />
        <NoteActions noteId={note._id} />
      </Stack>
    </AppContainer>
  );
}
