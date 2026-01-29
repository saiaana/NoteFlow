import { useState } from "react";
import { useTags } from "./useTags";

export function useNoteFormState() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");

  const {
    tags,
    tagInputValue,
    setTags,
    setTagInputValue,
    handleAddTag,
    handleRemoveTag,
    handleAddRecommendedTag,
  } = useTags();

  const validateTitle = (): boolean => {
    if (!title.trim()) {
      setTitleError("Title is required");
      return false;
    }
    setTitleError("");
    return true;
  };

  return {
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
  };
}
