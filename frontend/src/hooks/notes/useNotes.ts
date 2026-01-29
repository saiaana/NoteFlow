import { useEffect, useRef, useCallback } from "react";
import { useNoteStore } from "@/store/useNotesStore";
import { useParams } from "next/navigation";

export function useNotes() {
  const { tag } = useParams<{ tag?: string }>();
  const decodedTag = tag ? decodeURIComponent(tag) : undefined;

  const {
    notes,
    notesByTag,
    fetchNotes,
    loading,
    loadingMore,
    hasMore,
    setSortOrder,
    sortOrder,
  } = useNoteStore();

  const startedRef = useRef(false);

  const activeNotes = decodedTag ? notesByTag : notes;

  const nextCursor: Date | null = activeNotes?.length
    ? (() => {
        const createdAt = activeNotes[activeNotes.length - 1].createdAt;
        return createdAt instanceof Date ? createdAt : new Date(createdAt);
      })()
    : null;

  const canLoadMore = !loading && !loadingMore && hasMore && nextCursor;

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
    }
    fetchNotes(undefined, decodedTag);
  }, [decodedTag, sortOrder, fetchNotes]);

  const loadMore = useCallback(() => {
    if (!canLoadMore) return;
    fetchNotes(nextCursor, decodedTag);
  }, [fetchNotes, canLoadMore, nextCursor, decodedTag]);

  return {
    notes: activeNotes,
    tag: decodedTag,

    loading,
    loadingMore,
    hasMore,

    loadMore,
    sortOrder,
    setSortOrder,
  };
}
