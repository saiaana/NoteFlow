"use client";

import { useRouter } from "next/navigation";
import { Button, Container, Stack, Typography, Box } from "@mui/material";
import { useAuthStore } from "@/store/useAuthStore";

export default function NotFoundPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const handlePageMove = () => {
    if (user) router.push("/notes");
    else router.push("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={4} alignItems="center">
          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              background: "#4b7cc2",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "3rem", sm: "4rem" },
            }}
          >
            404
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "text.secondary",
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            Oops... The page you’re looking for doesn’t exist or has been moved.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={handlePageMove}
            sx={{
              background: "linear-gradient(90deg, #5b8fd9, #4b7cc2)",
              color: "#fff",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              boxShadow: "0 4px 14px rgba(91,143,217,0.3)",
              "&:hover": {
                background: "linear-gradient(90deg, #4b7cc2, #3b6bab)",
                boxShadow: "0 6px 18px rgba(91,143,217,0.4)",
              },
            }}
          >
            Back to Home
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
