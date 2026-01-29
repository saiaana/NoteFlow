"use client";

import { Container } from "@mui/material";

import LoadingSpinner from "@/components/ui/feedback/LoadingSpinner";
import NotesHeader from "./components/NotesHeader";
import NotesContainer from "../../components/notes/NotesContainer";

import { useAuthStore } from "@/store/useAuthStore";

export default function Page() {
  const { user, isInitialized, loading } = useAuthStore();

  // Wait for auth check to complete before showing content
  if (!isInitialized || loading) return <LoadingSpinner />;
  if (!user) return <LoadingSpinner />;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <NotesHeader user={user} />
      <NotesContainer />
    </Container>
  );
}
