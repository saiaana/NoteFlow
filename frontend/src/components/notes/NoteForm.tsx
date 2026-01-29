"use client";

import { Stack, TextField, Divider, Typography } from "@mui/material";

import FormCard from "@/components/ui/containers/FormCard";
import Tags from "@/components/notes/Tags";
import LongButton from "@/components/ui/buttons/LongButton";

import { useNoteForm } from "@/hooks/notes/useNoteForm";
import { useAuthStore } from "@/store/useAuthStore";

export default function NoteForm({ mode }: { mode: "create" | "edit" }) {
  const {
    noteId,
    title,
    titleError,
    setTitle,
    content,
    setContent,
    tags,
    tagInputValue,
    setTagInputValue,
    recommendedTags,
    handleAddTag,
    handleRemoveTag,
    handleAddRecommendedTag,
    handleSubmitNote,
    handleCancelChanges,
    submitError,
    isSubmitting,
  } = useNoteForm(mode);

  const { getDisplayName } = useAuthStore();

  return (
    <FormCard
      pageTitle={noteId ? "Edit Note" : "Create New Note"}
      helperText={`Author: ${getDisplayName()}`}
      maxWidth="md"
    >
      <Stack spacing={3}>
        <Divider sx={{ my: 2 }} />
        <form onSubmit={handleSubmitNote}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              fullWidth
              error={!!titleError}
              helperText={titleError}
            />

            <TextField
              label="Content"
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              rows={10}
              fullWidth
            />

            <Tags
              handleAddRecommendedTag={handleAddRecommendedTag}
              handleAddTag={handleAddTag}
              handleRemoveTag={handleRemoveTag}
              recommendedTags={recommendedTags}
              inputValue={tagInputValue}
              setInputValue={setTagInputValue}
              tags={tags}
            />
            <Stack spacing={2} mt={1.5}>
              {submitError && (
                <Typography style={{ color: "red", fontSize: "0.9rem" }}>
                  {submitError}
                </Typography>
              )}
              <LongButton
                buttonText={
                  isSubmitting
                    ? "SAVING..."
                    : noteId
                    ? "UPDATE NOTE"
                    : "CREATE NOTE"
                }
                disabled={isSubmitting}
                type="submit"
              />
              <LongButton
                buttonText="CANCEL"
                onClick={handleCancelChanges}
                type="button"
                variant="outlined"
                disabled={isSubmitting}
              />
            </Stack>
          </Stack>
        </form>
      </Stack>
    </FormCard>
  );
}
