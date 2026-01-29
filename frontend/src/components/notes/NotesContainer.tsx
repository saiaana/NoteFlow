import { Stack } from "@mui/material";

import EmptyState from "../ui/feedback/EmptyState";
import LoadingSpinner from "@/components/ui/feedback/LoadingSpinner";
import NotesList from "./NotesList";
import NotesPageFooter from "../../app/notes/[noteId]/components/NotesPageFooter";
import SortDropdown from "@/components/notes/SortDropdown";
import SearchBar from "@/components/ui/search/SearchBar";
import { useNoteStore } from "@/store/useNotesStore";

import { useNotes } from "@/hooks/notes/useNotes";
import { useParams } from "next/navigation";

export default function NotesContainer() {
  const {
    notes,
    loading,
    hasMore,
    loadMore,
    loadingMore,
    sortOrder,
    setSortOrder,
    tag,
  } = useNotes();

  const isTagPage = useParams().tag !== undefined;


  const { searchResults, isSearching, searchQuery } = useNoteStore();

  // Determine which notes to display
  const displayNotes = searchQuery ? searchResults : notes;
  const isLoading = loading || isSearching;
  const showPagination = !searchQuery && !loading;

  const emptyStateTitle = searchQuery
    ? `No notes found for "${searchQuery}"`
    : tag
    ? `No notes with tag "${tag}" yet.`
    : "No notes yet.";

  const emptyStateSubtitle = searchQuery
    ? "Try a different search term"
    : tag
    ? "Go back to add your first note 📝"
    : "Add your first note 📝";

  const notesEmpty = (!displayNotes || displayNotes.length === 0) && !isLoading;

  let content = null;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (notesEmpty) {
    content = (
      <EmptyState title={emptyStateTitle} subtitle={emptyStateSubtitle} />
    );
  } else {
    content = <NotesList notes={displayNotes} />;
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
      {!isTagPage && <SearchBar />}
      </Stack>
      {content}
      {showPagination && (
        <NotesPageFooter
          hasMore={hasMore}
          loadMore={loadMore}
          loadingMore={loadingMore}
        />
      )}
    </Stack>
  );
}
