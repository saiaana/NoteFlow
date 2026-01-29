import { PaletteMode } from "@mui/material";

export const getPalette = (mode: PaletteMode) => {
  const isDark = mode === "dark";

  const base = {
    blue: {
      light: "#e6efff",
      main: "#5b8fd9",
      dark: "#4b7cc2",
    },
    violet: "#6a11cb",
    red: {
      light: "#d9534f",
      dark: "#c23d3a",
    },
    gray: {
      light: "#f5f8fa",
      medium: "#dbe3eb",
      dark: "#3a4455",
    },
  };

  return {
    mode,
    primary: {
      main: base.blue.main,
      dark: base.blue.dark,
      light: base.blue.light,
    },
    secondary: { main: base.violet },
    error: {
      main: base.red.light,
      dark: base.red.dark,
      light: "#f8d7da",
    },
    success: {
      main: "#4caf50",
      dark: "#388e3c",
      light: "#c8e6c9",
    },
    background: {
      default: isDark ? "#121212" : "#f0f4f8",
      paper: isDark ? "#1e1e1e" : "#ffffff",
    },
    text: {
      primary: isDark ? "#f5f5f5" : "#1a1a1a",
      secondary: isDark ? "#a0a0a0" : "#404040",
    },
    custom: {
      colors: base,
      gradient: {
        light: "linear-gradient(135deg, #f9fbfd 0%, #f2f6fa 100%)",
        dark: "linear-gradient(135deg, #1e2633 0%, #2a3445 100%)",
      },
      hoverGradient: {
        light: "linear-gradient(135deg, #f0f6fa 0%, #dee8f1 100%)",
        dark: "linear-gradient(135deg, #263144 0%, #33445b 100%)",
      },
      shadow: {
        light: "0 2px 10px rgba(0,0,0,0.08)",
        dark: "0 2px 10px rgba(0,0,0,0.35)",
      },
      surface: {
        light: "#ffffff",
        dark: "#1e2633",
        elevatedLight: "#f8fafc",
        elevatedDark: "#2a3546",
        chipLight: "#c9d9f2",
        chipDark: "#3b4659",
        hoverLight: "rgba(0,0,0,0.05)",
        hoverDark: "rgba(255,255,255,0.05)",
      },
      border: {
        light: "rgba(0,0,0,0.15)",
        dark: "rgba(255,255,255,0.1)",
        hoverLight: "#90a8c3",
        hoverDark: "#6b8fc2",
      },
    },
  };
};
