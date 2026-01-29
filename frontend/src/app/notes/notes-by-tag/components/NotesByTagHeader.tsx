import { Box, Chip, Stack, Typography } from "@mui/material";

type TagHeaderProps = {
  tag?: string;
};

export default function NotesByTagHeader({ tag }: TagHeaderProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Typography variant="h5" fontWeight={600}>
          Tag:
        </Typography>
        <Chip label={tag} size="medium" color="primary" />
      </Box>
    </Stack>
  );
}
