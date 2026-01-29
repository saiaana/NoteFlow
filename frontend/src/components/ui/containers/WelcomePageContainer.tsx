"use client";

import { Box, Typography, Container, Stack, useTheme } from "@mui/material";

import LoadingSpinner from "@/components/ui/feedback/LoadingSpinner";
import ShortButton from "@/components/ui/buttons/ShortButton";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function WelcomePageContainer() {
  const router = useRouter();
  const theme = useTheme();
  const { user, loading, demoLogin, isAuthorized } = useAuthStore();

  const handleDemoLogin = async () => {
    const res = await demoLogin();
    console.log(res);
    if (res?.success) router.push("/notes");
  };

  if (!isAuthorized && loading) return <LoadingSpinner />;

  const renderButtons = () => {
    if (!user) {
      return (
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
          <ShortButton buttonText="Log in" navigateTo="/login" />
          <ShortButton
            buttonText="Try Demo"
            onClick={handleDemoLogin}
            variant="outlined"
          />
        </Stack>
      );
    }

    if (user.role === "demo-user") {
      return (
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
          <ShortButton buttonText="Log in" navigateTo="/login" />
          <ShortButton
            buttonText="Go back to Demo Mode"
            navigateTo="/notes"
            variant="outlined"
          />
        </Stack>
      );
    }

    if (user) {
      return (
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
          <ShortButton buttonText="Go to my Notes" navigateTo="/notes" />
        </Stack>
      );
    }
  };

  return (
    <Box sx={theme.custom.pageContainer}>
      <Container maxWidth="sm" sx={theme.custom.centeredContainer}>
        <Typography sx={theme.custom.sectionTitle}>
          All your notes and thoughts in one place
        </Typography>
        <Typography sx={theme.custom.smallText} variant="body1">
          Create, edit, and keep your thoughts safe and organized. A simple,
          elegant app that works seamlessly across all your devices.
        </Typography>
        {renderButtons()}
      </Container>
    </Box>
  );
}
