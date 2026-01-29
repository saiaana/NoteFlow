import { useRouter } from "next/navigation";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import NoteMetaData from "@/components/notes/NoteMetaData";
import NoteTagList from "@/components/notes/NoteTagList";
import ShortButton from "@/components/ui/buttons/ShortButton";

import { Note } from "@/types/note";

type NoteCardProps = {
  note: Note;
};

export default function NoteCard({ note }: NoteCardProps) {
  const router = useRouter();

  const contentPreview = (content: string, characterLimit = 100) =>
    content.length > characterLimit
      ? content.slice(0, characterLimit) + "..."
      : content;

  return (
    <Card onClick={() => router.push(`/notes/${note._id}`)}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5">{note.title}</Typography>
          <NoteMetaData note={note} />
          <Typography variant="body1" color="text.secondary">
            {contentPreview(note.content)}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.5,
              mt: 2,
            }}
          >
            <ShortButton
              buttonText="Read more"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/notes/${note._id}`);
              }}
            />

            <Box
              sx={{
                flex: 1,
                minWidth: "180px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 0.8,
              }}
            >
              <NoteTagList note={note} />
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
