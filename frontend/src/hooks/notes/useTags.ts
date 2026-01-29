import { useState } from "react";

export function useTags(initialTags: string[] = []) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [tagInputValue, setTagInputValue] = useState<string>("");

  const handleAddTag = () => {
    const newTag = tagInputValue.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddRecommendedTag = (tag: string) => {
    if (!tags.includes(tag)) setTags([...tags, tag]);
  };

  return {
    tags,
    tagInputValue,
    setTags,
    setTagInputValue,
    handleAddTag,
    handleRemoveTag,
    handleAddRecommendedTag,
  };
}
