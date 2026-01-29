import { create } from "zustand";
import { Note, NoteState } from "@/types/note";
import {
  searchNotes as searchNotesApi,
  deleteNote,
  getNotes,
  getCurrentNote,
  updateNote,
  createNote,
} from "@/lib/api/notesApi";

export const useNoteStore = create<NoteState>((set, get) => ({
  notes: [],
  notesByTag: [],
  searchResults: [],
  searchQuery: "",
  isSearching: false,
  note: {
    _id: "",
    title: "",
    content: "",
    tags: [],
    author: "",
    createdAt: new Date(),
  },
  loading: false,
  sortOrder: "asc",
  nextCursor: null,
  hasMore: true,
  loadingMore: false,
  setSortOrder: (order) => set({ sortOrder: order }),

  fetchNotes: async (cursor?: Date | null, tag?: string) => {
    const { sortOrder } = get();

    if (!cursor) set({ loading: true });
    else set({ loadingMore: true });

    try {
      const data = await getNotes({ sort: sortOrder, cursor, tag });

      if (data.status === "success") {
        const newNotes = tag ? data.data.notesByTag : data.data.notes;
        set((state) => ({
          [tag ? "notesByTag" : "notes"]: cursor
            ? [...state[tag ? "notesByTag" : "notes"], ...newNotes]
            : newNotes,
          hasMore: data.hasMore,
        }));
      }
    } catch (err) {
      console.error("fetchNotes error:", err);
    } finally {
      set({ loading: false, loadingMore: false });
    }
  },

  clearNotes: () => set({ notes: [] }),

  addNote: async (fields) => {
    try {
      const note = await createNote(fields);
      set((state) => ({
        notes: [note, ...state.notes],
      }));
      return { success: true, note };
    } catch (err) {
      console.error("addNote error:", err);
      return { success: false, error: (err as Error).message };
    }
  },

  fetchCurrentNote: async (noteId: string) => {
    set({ loading: true });
    try {
      const note = await getCurrentNote(noteId);
      set({ note, loading: false });
      return { success: true };
    } catch (err) {
      console.error("fetchCurrentNote error:", err);
      set({ loading: false });
      return { success: false, error: (err as Error).message };
    }
  },

  updateNote: async (noteId, updatedFields) => {
    set({ loading: true });
    try {
      const updatedNote = await updateNote(noteId, updatedFields);
      set((state) => ({
        note: updatedNote,
        notes: state.notes.map((n) =>
          n._id === updatedNote._id ? updatedNote : n
        ),
        loading: false,
      }));
      return { success: true };
    } catch (err) {
      console.error("updateNote error:", err);
      set({ loading: false });
      return { success: false, error: (err as Error).message };
    }
  },

  searchNotes: async (query: string) => {
    if (!query.trim()) {
      set({ searchResults: [], searchQuery: "", isSearching: false });
      return;
    }

    set({ isSearching: true, searchQuery: query });
    try {
      const notes = await searchNotesApi(query);
      set({ searchResults: notes, isSearching: false });
    } catch (err) {
      console.error("searchNotes error:", err);
      set({ searchResults: [], isSearching: false });
    }
  },

  clearSearch: () => {
    set({ searchResults: [], searchQuery: "", isSearching: false });
  },

  setNote: (note: Note) => set({ note }),

  deleteNote: async (noteId: string) => {
    try {
      await deleteNote(noteId);
      set((state) => ({
        notes: state.notes.filter((n) => n._id !== noteId),
      }));
      return { success: true };
    } catch (err) {
      console.error("deleteNote error:", err);
      return { success: false, error: (err as Error).message };
    }
  },
}));
