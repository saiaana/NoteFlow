"use client";
import { useNoteStore } from "@/store/useNotesStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useNote() {
  const params = useParams();
  const noteId = params.noteId as string;

  const [error, setError] = useState<string | null>(null);

  const { note, fetchCurrentNote, loading } = useNoteStore();

  useEffect(() => {
    const loadNote = async () => {
      if (!noteId) return;

      const result = await fetchCurrentNote(noteId);
      if (!result.success) {
        setError(result.error || "Note not found");
      }
    };

    loadNote();
  }, [noteId, fetchCurrentNote]);

  return { note, loading, error };
}
