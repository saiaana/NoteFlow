import { Note } from "@/types/note";
import { API_BASE_URL } from "./config";

const BASE_URL = `${API_BASE_URL}/api/v1`;

export const getNotes = async ({
  limit = 3,
  sort = "asc",
  cursor,
  tag,
}: {
  limit?: number;
  sort?: "asc" | "desc";
  cursor?: Date | null;
  tag?: string;
}) => {
  try {
    const basePath = tag
      ? `${BASE_URL}/notes/notes-by-tag`
      : `${BASE_URL}/notes/get-my-notes`;

    const url = new URL(basePath);
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("sort", sort);
  if (cursor) url.searchParams.set("cursor", cursor.toISOString());
    if (tag) url.searchParams.set("tags", tag);

    const res = await fetch(url, { credentials: "include" });
    if (!res.ok) throw new Error(`Failed to fetch notes (${res.status})`);

    const data = await res.json();
    if (data.status !== "success") throw new Error("Invalid notes response");

    return data;
  } catch (err) {
    console.error("getNotes error:", err);
    throw err;
  }
};

export const createNote = async (fields: {
  title: string;
  content: string;
  tags: string[];
}): Promise<Note> => {
  try {
    const res = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(fields),
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      throw new Error(
        `Failed to create note: ${res.status} ${errorText || res.statusText}`
      );
    }

    const data = await res.json();
    if (data.status !== "success" || !data.data?.note) {
      throw new Error("Invalid API response structure");
    }

    return data.data.note as Note;
  } catch (err) {
    console.error("createNote error:", err);
    throw err;
  }
};

export const getCurrentNote = async (noteId: string): Promise<Note> => {
  try {
    const res = await fetch(`${BASE_URL}/notes/${noteId}`, {
      credentials: "include",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to fetch note ${noteId}: ${res.status} ${
          errorText || res.statusText
        }`
      );
    }

    const data = await res.json();
    if (data.status !== "success" || !data.data?.doc) {
      throw new Error("Invalid note data format");
    }

    return data.data.doc as Note;
  } catch (err) {
    console.error("getCurrentNote error:", err);
    throw err;
  }
};

export const updateNote = async (
  noteId: string,
  updatedFields: Partial<Note>
): Promise<Note> => {
  try {
    const res = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to update note: ${res.status} ${errText}`);
    }

    const data = await res.json();
    if (data.status !== "success" || !data.data?.doc) {
      throw new Error("Invalid API response structure");
    }

    return data.data.doc as Note;
  } catch (err) {
    console.error("updateNote error:", err);
    throw err;
  }
};

export const deleteNote = async (noteId: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/notes/${noteId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (res.status === 204 || res.ok) return;

  const text = await res.text();
  if (text) {
    try {
      const data = JSON.parse(text);
      throw new Error(data?.message || "Failed to delete note");
    } catch {
      throw new Error("Invalid server response");
    }
  }

  throw new Error(`Unexpected response: ${res.status}`);
};


export const searchNotes = async (query: string): Promise<Note[]> => {
  if (!query.trim()) return [];

  const url = new URL(`${BASE_URL}/notes/search`);
  url.searchParams.set("query", query.trim());

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error(`Failed to search notes: ${res.status}`);

  const data = await res.json();
  if (data.status !== "success") throw new Error("Invalid search response");

  return data.data.notes || [];
};