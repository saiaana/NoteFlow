"use client";

import { notFound } from "next/navigation";
import { useNote } from "@/hooks/notes/useNote";
import LoadingSpinner from "@/components/ui/feedback/LoadingSpinner";
import NotePageContent from "./NotePageContent";

export default function NotePageContainer() {
  const { note, loading, error } = useNote();

  if (error) {
    return notFound();
  }

  if (loading || !note?._id) {
    return <LoadingSpinner />;
  }

  return <NotePageContent note={note} />;
}
