import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: "center",
        color: "text.secondary",
        fontSize: "0.875rem",
      }}
    >
      © {new Date().getFullYear()} NoteFlow. All rights reserved.
    </Box>
  );
}
