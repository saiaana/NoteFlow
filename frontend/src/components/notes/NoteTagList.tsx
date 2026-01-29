import { useRouter } from "next/navigation";
import { Chip, Stack } from "@mui/material";
import { Note } from "../../types/note";

type NoteTagListProps = { note: Note };

export default function NoteTagList({ note }: NoteTagListProps) {
  const router = useRouter();

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    router.push(`/notes/notes-by-tag/${tag}`);
  };

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      sx={{ mt: 2, gap: 1, justifyContent: "flex-end", alignItems: "center" }}
    >
      {note.tags.map((tag, i) => (
        <Chip
          key={i}
          label={tag}
          size="small"
          color="primary"
          variant="filled"
          onClick={(e) => handleTagClick(e, tag)}
        />
      ))}
    </Stack>
  );
}
