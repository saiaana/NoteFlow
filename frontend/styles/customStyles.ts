import { Theme } from "@mui/material";

export const getCustomStyles = (theme: Theme) => {
  const isDark = theme.palette.mode === "dark";

  return {
    /* 🟦 CONTAINERS & LAYOUT */
    pageContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      background: theme.palette.background.default,
    },

    centeredContainer: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      gap: theme.spacing(4),
    },
    /* 🟨 CARDS & SURFACES */
    card: {
      borderRadius: 2,
      p: { xs: 2, sm: 4, md: 5 },
      boxShadow: isDark
        ? theme.palette.custom.shadow.dark
        : theme.palette.custom.shadow.light,
      background: isDark
        ? theme.palette.custom.gradient.dark
        : theme.palette.custom.gradient.light,
      transition: "background .3s ease, box-shadow .3s ease",
    },
    formContainer: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius * 1.5,
      p: theme.spacing(4),
      boxShadow: isDark
        ? "0 8px 24px rgba(0,0,0,0.6)"
        : "0 6px 20px rgba(0,0,0,0.08)",
      border: `1px solid ${
        isDark
          ? theme.palette.custom.border.dark
          : theme.palette.custom.border.light
      }`,
      transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    },
    /* 🟩 INPUTS */
    inputField: {
      "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        backgroundColor: isDark
          ? theme.palette.custom.surface.elevatedDark
          : theme.palette.custom.surface.elevatedLight,
        "& input, & textarea": { color: theme.palette.text.primary },
        "&:hover fieldset": {
          borderColor: isDark
            ? theme.palette.custom.border.hoverDark
            : theme.palette.custom.border.hoverLight,
        },
        "&.Mui-focused fieldset": {
          borderColor: theme.palette.primary.main,
        },
      },
    },

    /* 🟪 DIALOGS */
    dialogPaper: {
      borderRadius: "18px",
      p: theme.spacing(3),
      maxWidth: 420,
      width: "90%",
      textAlign: "center",
      background: isDark
        ? "linear-gradient(135deg, #1b2432 0%, #28394a 100%)"
        : "linear-gradient(135deg, #f9fbff 0%, #eaf1f8 100%)",
      boxShadow: isDark
        ? "0 8px 28px rgba(0,0,0,0.6)"
        : "0 8px 24px rgba(91,143,217,0.2)",
      border: `1px solid ${
        isDark
          ? theme.palette.custom.border.dark
          : theme.palette.custom.border.light
      }`,
      backdropFilter: "blur(10px)",
      transition: "all 0.3s ease",
    },

    dialogBackdrop: {
      backgroundColor: "rgba(0,0,0,0.45)",
      backdropFilter: "blur(6px)",
    },

    dialogGradients: {
      red: "linear-gradient(90deg, #e74c3c, #c0392b)",
      redHover: "linear-gradient(90deg, #c0392b, #a93226)",
      demoLogout: "linear-gradient(90deg, #f5a623, #fbc02d)",
      demoLogoutHover: "linear-gradient(90deg, #fbc02d, #f5a623)",
    },
    dialogActions: {
      display: "flex",
      justifyContent: "center",
      gap: 2,
      pt: 3,
      pb: 2,
    },

    /* 🟧 TEXT & LINKS */
    gradientText: {
      // используй primary, чтобы цвет совпадал с темой
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    sectionTitle: {
      ...theme.typography.h3,
      color: theme.palette.primary.main,
    },

    smallText: {
      color: theme.palette.text.secondary,
      lineHeight: 1.7,
      maxWidth: 400,
    },

    /*TAGS*/
    tagInputWrapper: {
      display: "flex",
      alignItems: "center",
      borderRadius: 2,
      border: `1px solid ${
        isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
      }`,
      padding: theme.spacing(1.2),
      transition: theme.transitions.create("border-color", {
        duration: theme.transitions.duration.short,
      }),
      "&:focus-within": {
        borderColor: theme.palette.primary.main,
      },
    },
    tagList: {
      display: "flex",
      flexWrap: "wrap",
      gap: theme.spacing(1), 
      marginTop: theme.spacing(2),
    },

    recommendedTagsSection: {
      marginTop: theme.spacing(3),
    },
  };
};
