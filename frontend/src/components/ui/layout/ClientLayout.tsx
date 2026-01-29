"use client";

import { useEffect, useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";

import Header from "@/components/ui/layout/Header";
import Footer from "@/components/ui/layout/Footer";
import LogoutConfirmationDialog from "@/components/ui/dialogs/LogoutConfirmationDialog";
import DeletionConfirmationDialog from "@/components/ui/dialogs/DeletionConfirmationDialog";

import { getAppTheme } from "../../../../styles/theme";

import { useAuthStore } from "@/store/useAuthStore";

export default function ClientLayout({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: "light" | "dark";
}) {
  const [mode, setMode] = useState<"light" | "dark">(initialTheme);
  const [mounted, setMounted] = useState(false);

  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setMode(mq.matches ? "dark" : "light");
    const onChange = (e: MediaQueryListEvent) =>
      setMode(e.matches ? "dark" : "light");

    mq.addEventListener("change", onChange);

    setMounted(true);

    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!mounted) {
    return null;
  }

  const theme = getAppTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
          transition: "background-color 0.3s ease",
        }}
      >
        <Header />
        <LogoutConfirmationDialog />
        <DeletionConfirmationDialog />
        <Box
          component="main"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            px: { xs: 2, sm: 3, md: 4 },
            py: 3,
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
