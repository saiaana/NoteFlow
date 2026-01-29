import ShortButton from "@/components/ui/buttons/ShortButton";
import { Box, CircularProgress } from "@mui/material";

type NotesPageFooterProps = {
  hasMore: boolean;
  loadingMore: boolean;
  loadMore: () => void;
};

export default function NotesPageFooter({
  hasMore,
  loadingMore,
  loadMore,
}: NotesPageFooterProps) {
  let content;

  if (loadingMore) {
    content = <CircularProgress size={28} thickness={4} />;
  } else if (hasMore && !loadingMore) {
    content = (
      <ShortButton
        onClick={loadMore}
        buttonText="Load More"
        size="small"
        variant="text"
      />
    );
  } else {
    content = "No more notes";
  }

  return (
    hasMore && (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {content}
      </Box>
    )
  );
}
