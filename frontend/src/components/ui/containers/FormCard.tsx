"use client";

import {
  Box,
  Container,
  Stack,
  Typography,
  useTheme,
  Link,
} from "@mui/material";
import { ReactNode } from "react";

type FormCardProps = {
  pageTitle: string;
  helperText: string;
  authPrompt?: string;
  authLinkText?: string;
  children: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
};

export default function FormCard({
  pageTitle,
  helperText,
  authPrompt,
  authLinkText,
  children,
  maxWidth = "sm",
}: FormCardProps) {
  const theme = useTheme();

  return (
    <Container maxWidth={maxWidth}>
      <Box sx={theme.custom.card}>
        <Stack spacing={3}>
          <Typography
            variant="h4"
            align="center"
            fontWeight={700}
            sx={theme.custom.gradientText}
          >
            {pageTitle}
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            sx={{ fontSize: "0.95rem" }}
          >
            {helperText}
          </Typography>
          
          {children}

          <Typography
            align="center"
            color="text.secondary"
            variant="body2"
            sx={{ mt: 1 }}
          >
            {authPrompt}{" "}
            <Link
              href={authLinkText?.replace(/\s+/g, "").toLowerCase()}
              underline="hover"
              sx={{ fontWeight: 600 }}
            >
              {authLinkText}
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
}
