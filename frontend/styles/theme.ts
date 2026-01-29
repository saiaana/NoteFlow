import { createTheme, responsiveFontSizes } from "@mui/material";
import { getPalette } from "./palette";
import { typography } from "./typography";
import { getComponentOverrides } from "./components";
import { getCustomStyles } from "./customStyles";

declare module "@mui/material/styles" {
  interface CustomPalette {
    colors: {
      blue: { light: string; main: string; dark: string };
      violet: string;
      red: { light: string; dark: string };
      gray: { light: string; medium: string; dark: string };
    };
    gradient: Record<string, string>;
    hoverGradient: Record<string, string>;
    shadow: Record<string, string>;
    surface: Record<string, string>;
    border: Record<string, string>;
  }

  interface Palette {
    custom: CustomPalette;
  }
  interface PaletteOptions {
    custom?: Partial<CustomPalette>;
  }

  interface Theme {
    custom: ReturnType<typeof getCustomStyles>;
  }
  interface ThemeOptions {
    custom?: Theme["custom"];
  }
}

export const getAppTheme = (mode: "light" | "dark") => {
  const palette = getPalette(mode);

  const baseTheme = createTheme({
    palette,
    typography,
    shape: { borderRadius: 12 },
  });

  const components = getComponentOverrides(baseTheme);
  const custom = getCustomStyles(baseTheme);

  const theme = createTheme(baseTheme, { components, custom });
  return responsiveFontSizes(theme);
};
