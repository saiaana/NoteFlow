import { Container, styled } from "@mui/material";

export const AppContainer = styled(Container)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow:
    theme.palette.mode === "light"
      ? "0 4px 15px rgba(0,0,0,0.08)"
      : "0 4px 20px rgba(0,0,0,0.4)",
  padding: theme.spacing(5),
  transition: "all 0.3s ease",
}));
