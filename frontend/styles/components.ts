import { Components, Theme } from "@mui/material";

export const getComponentOverrides = (theme: Theme): Components => ({
  /* 🟦 BUTTONS */
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        textTransform: "uppercase",
        fontWeight: 600,
        transition: "all 0.25s ease",
      },
      sizeLarge: { padding: "10px 32px", fontSize: "1rem" },
      sizeMedium: { padding: "8px 22px", fontSize: "0.85rem" },
      sizeSmall: { padding: "4px 18px", fontSize: "0.8rem" },
    },
    variants: [
      {
        props: { variant: "contained", color: "primary" },
        style: {
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 14px rgba(91,143,217,.30)"
              : "0 4px 14px rgba(91,143,217,.25)",
          "&:hover": {
            background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            transform: "translateY(-1px)",
          },
        },
      },
      {
        props: { variant: "text", color: "primary" },
        style: {
          color: theme.palette.primary.main,
          "&:hover": {
            color:
              theme.palette.mode === "dark"
                ? theme.palette.primary.light
                : theme.palette.primary.dark,
          },
        },
      },

      {
        props: { variant: "outlined", color: "primary" },
        style: {
          borderWidth: 1,
          borderColor: `${theme.palette.primary.main}80`,
          color: theme.palette.primary.dark,
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.custom.surface.hoverDark
                : theme.palette.custom.surface.hoverLight,
            borderColor: theme.palette.primary.main,
          },
        },
      },
    ],
  },

  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        transition: "all 0.25s ease",
      },
    },
    variants: [
      {
        props: { color: "primary" },
        style: {
          backgroundColor: theme.palette.primary.main,
          color: "#fff",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            transform: "translateY(-1px)",
          },
        },
      },
    ],
  },

  /* 🟩 CHIPS */
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.25s ease",
      },
      sizeSmall: { height: 26 },
    },
    variants: [
      /* 🌑 FILLED */
      {
        props: { variant: "filled", color: "primary", size: "small" },
        style: {
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.custom.surface.chipDark
              : theme.palette.custom.surface.chipLight,
          color: theme.palette.text.primary,

          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        },
      },

      /* 🩶 OUTLINED */
      {
        props: { variant: "outlined", color: "primary", size: "small" },
        style: {
          borderColor:
            theme.palette.mode === "dark"
              ? theme.palette.custom.border.dark
              : theme.palette.custom.border.light,
          color:
            theme.palette.mode === "dark"
              ? theme.palette.text.secondary
              : theme.palette.text.primary,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.custom.surface.dark
              : theme.palette.custom.surface.light,
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
          },
        },
      },
    ],
  },

  /* 🟨 CARDS */
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        cursor: "pointer",
        transition:
          "transform .25s ease, box-shadow .25s ease, background .25s ease",
        boxShadow:
          theme.palette.mode === "dark"
            ? theme.palette.custom.shadow.dark
            : theme.palette.custom.shadow.light,
        background:
          theme.palette.mode === "dark"
            ? theme.palette.custom.gradient.dark
            : theme.palette.custom.gradient.light,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 8px 20px rgba(0,0,0,.50)"
              : "0 8px 20px rgba(0,0,0,.18)",
          background:
            theme.palette.mode === "dark"
              ? theme.palette.custom.hoverGradient.dark
              : theme.palette.custom.hoverGradient.light,
        },
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: theme.spacing(3),
      },
    },
  },

  /* 🟦 TEXTFIELDS */
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: 10,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.custom.surface.elevatedDark
              : theme.palette.custom.surface.elevatedLight,
          "& fieldset": {
            borderColor:
              theme.palette.mode === "dark"
                ? theme.palette.custom.border.dark
                : theme.palette.custom.border.light,
          },
          "&:hover fieldset": {
            borderColor:
              theme.palette.mode === "dark"
                ? theme.palette.custom.border.hoverDark
                : theme.palette.custom.border.hoverLight,
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
          },
        },
      },
    },
  },

  /* 🟪 TYPOGRAPHY */
  MuiTypography: {
    styleOverrides: {
      h5: {
        fontWeight: 600,
        color:
          theme.palette.mode === "dark"
            ? theme.palette.primary.light
            : theme.palette.primary.dark,
      },
      body1: { lineHeight: 1.6 },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor:
          theme.palette.mode === "dark"
            ? theme.palette.custom.border.dark
            : theme.palette.custom.border.light,
      },
    },
  },
});
