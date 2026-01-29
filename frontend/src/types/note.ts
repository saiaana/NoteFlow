export interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  author: string;
  createdAt: string | Date;
}

export type SortOrder = "asc" | "desc";

export type NoteResponse =
  | { success: true; note: Note; error?: undefined }
  | { success: false; error: string; note?: undefined };

export type SimpleResponse =
  | { success: true; error?: undefined }
  | { success: false; error: string };

export interface NoteState {
  notes: Note[];
  notesByTag: Note[];
  searchResults: Note[];
  searchQuery: string;
  isSearching: boolean;
  note: Note | null;
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  nextCursor: Date | null;
  sortOrder: SortOrder;

  setSortOrder: (order: SortOrder) => void;

  fetchNotes: (cursor?: Date | null, tag?: string) => Promise<void>;

  clearNotes: () => void;

  addNote: (fields: {
    title: string;
    content: string;
    tags: string[];
  }) => Promise<NoteResponse>;

  fetchCurrentNote: (noteId: string) => Promise<SimpleResponse>;

  updateNote: (
    noteId: string,
    updatedFields: Partial<Note>
  ) => Promise<SimpleResponse>;

  searchNotes: (query: string) => Promise<void>;
  clearSearch: () => void;

  deleteNote: (noteId: string) => Promise<SimpleResponse>;
}
