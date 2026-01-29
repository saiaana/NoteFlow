"use client";
import { useRouter } from "next/navigation";

import { Container, Stack } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import LoadingSpinner from "@/components/ui/feedback/LoadingSpinner";
import NotesContainer from "@/components/notes/NotesContainer";
import NotesByTagHeader from "../components/NotesByTagHeader";
import ShortButton from "@/components/ui/buttons/ShortButton";

import { useNotes } from "@/hooks/notes/useNotes";
import { useAuthStore } from "@/store/useAuthStore";

export default function Page() {
  const router = useRouter();

  const { user } = useAuthStore();
  const { tag } = useNotes();

  if (!user) return <LoadingSpinner />;

  return (
    <Container maxWidth="md">
      <Stack spacing={3}>
        <NotesByTagHeader tag={tag} />
        <NotesContainer />
        <ShortButton
          buttonText="Back to Notes"
          variant="outlined"
          size="medium"
          startIcon={<ArrowBack />}
          onClick={() => router.push("/notes")}
        />
      </Stack>
    </Container>
  );
}
