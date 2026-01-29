"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useNoteStore } from "@/store/useNotesStore";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useNoteFormState } from "@/hooks/notes/useNoteFormState";

export function useNoteForm(mode: "edit" | "create") {
  const router = useRouter();
  const params = useParams();
  const noteId = params?.noteId as string | undefined;

  const { note, fetchCurrentNote, updateNote, addNote } = useNoteStore();
  const { user } = useAuthStore();

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    title,
    content,
    tags,
    tagInputValue,
    titleError,
    setTitle,
    setContent,
    setTagInputValue,
    setTags,
    handleAddTag,
    handleRemoveTag,
    handleAddRecommendedTag,
    validateTitle,
  } = useNoteFormState();

  const navigateToNotes = () => router.push("/notes");

  const recommendedTags = [
    "important",
    "to-buy",
    "to-do",
    "work",
    "hobby",
    "birthdays",
    "family",
  ];

  useEffect(() => {
    const loadNote = async () => {
      if (mode !== "edit" || !noteId) return;

      const result = await fetchCurrentNote(noteId);

      if (!result.success) {
        setError(result.error || "Note not found");
      }
    };

    loadNote();
  }, [noteId, fetchCurrentNote, mode]);

  useEffect(() => {
    if (noteId && note?._id) {
      setTitle(note?.title);
      setContent(note?.content);
      setTags(note?.tags);
    }
  }, [noteId, note, setTags, setContent, setTitle]);

  useEffect(() => {
    if (error) {
      notFound();
    }
  }, [error]);

  const handleSubmitNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateTitle()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const result = noteId
      ? await updateNote(noteId, {
          title,
          content,
          tags,
        })
      : await addNote({
          title,
          content,
          tags,
        });

    setIsSubmitting(false);

    if (result.success) {
      navigateToNotes();
    } else {
      console.error(result.error);
      setSubmitError("Something went wrong while saving the note.");
    }
  };

  const handleCancelChanges = () => {
    navigateToNotes();
  };

  return {
    noteId,
    user,
    title,
    content,
    tagInputValue,
    tags,
    recommendedTags,
    setTitle,
    setContent,
    setTagInputValue,
    handleAddTag,
    handleRemoveTag,
    handleAddRecommendedTag,
    handleSubmitNote,
    handleCancelChanges,
    titleError,
    submitError,
    isSubmitting,
  };
}
