import { createTheme } from "@mui/material/styles";
import { lighten, darken } from "@mui/material/styles/colorManipulator";
import { muiColors } from "@mui/material/colors";

// Utility function to generate color variants for a base color.
// This includes the main color, a lighter variant, and a darker variant for hover states.
const generateColorVariants = (color) => ({
  main: color,
  light: lighten(color, 0.3), // Generates a lighter variant of the base color.
  dark: darken(color, 0.1), // Generates a darker variant of the base color for hover states.
});

// Base colors with variants for the theme.
// This includes primary, secondary, tertiary colors, and specific text colors.
const colors = {
  darkTeal: generateColorVariants("#2a788b"), // Used as the primary color.
  orange: generateColorVariants("#eaac60"), // Used as the secondary color.
  green: generateColorVariants("#c2c76c"), // Used as the tertiary or accent color.
  darkGray: generateColorVariants("#3B3A39"), // Used for dark text.
  head_text: generateColorVariants("#406E7B"), // Used for header text.
  light_text: generateColorVariants("#98A9AE"), // Used for lighter text.
  text: generateColorVariants("#889BA1"), // Used for general text.
  title_text: generateColorVariants("#69878E"), // Used for titles.
};

// Defines the theme with a custom color palette and typography settings.
const theme = createTheme({
  palette: {
    primary: colors.darkTeal,
    secondary: colors.orange,
    tertiary: colors.green,
    dark_text: colors.darkGray,
    head_text: colors.head_text,
    light_text: colors.light_text,
    text: colors.text,
    title_text: colors.title_text,
  },
  typography: {
    fontFamily:
      '"Libel-Suit Reg", "Acumin Pro Condensed", "MaryDale", sans-serif',
    h1: { fontWeight: 500, fontSize: "2.5rem", fontFamily: "Libel-Suit Reg" }, // Style for h1 tags.
    h2: { fontWeight: 500, fontFamily: "Libel-Suit Reg" }, // Style for h2 tags.
    body1: { lineHeight: 1.6, fontFamily: "Acumin Pro Condensed" }, // Style for body text.
    callout: { fontFamily: "Libel-Suit Reg" }, // Custom style for callouts.
    feature: { fontFamily: "MaryDale" }, // Custom style for featured text.
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "Libel-Suit Reg",
          fontWeight: 500,
        },
        contained: {
          borderRadius: 18,
          "&.primary": {
            backgroundColor: colors.secondary.main, // Note: This applies the secondary color to primary variant buttons, in this case, orange
            color: muiColors.common.white,
            "&:hover": { backgroundColor: colors.secondary.dark },
            "&.off": {
              backgroundColor: colors.secondary.light,
              color: muiColors.common.white,
            },
          },
          "&.small": {
            borderRadius: 12,
            padding: "6px 16px",
            fontSize: "0.875rem",
            "&.on": {
              backgroundColor: colors.secondary.main, // Orange background for on state, similar to primary button style
              color: muiColors.common.white,
              "&:hover": { backgroundColor: colors.secondary.dark },
            },
            "&.off": {
              color: colors.secondary.dark, // Darker text when off/inactive, similar to off state of secondary button
              borderColor: colors.secondary.dark, // Darker border when off/inactive
              backgroundColor: "transparent", // Ensures the background is transparent in off state
            },
          },
          "&.pop-up": {
            "&.on": {
              backgroundColor: colors.primary.main, // Blue background for on state
              color: muiColors.common.white,
              "&:hover": { backgroundColor: colors.primary.dark },
            },
            "&.off": {
              color: colors.primary.main, // Blue text for off state
              borderColor: colors.primary.main, // Blue border for off state
              backgroundColor: "transparent", // Transparent background for off state
              "&:hover": { borderColor: colors.primary.dark }, // Darker border on hover for off state
            },
          },
          "&.medium": {
            padding: "8px 20px",
            fontSize: "0.9375rem",
            "&.on": {
              backgroundColor: colors.secondary.main, // Orange background for on state, similar to primary button's on state
              color: muiColors.common.white,
              "&:hover": { backgroundColor: colors.secondary.dark },
            },
            "&.off": {
              color: colors.secondary.main, // Orange text for off state
              borderColor: colors.secondary.main, // Orange border for off state
              backgroundColor: "transparent", // Transparent background for off state
              "&:hover": { borderColor: colors.secondary.dark }, // Darker border on hover for off state
            },
          },
        },
      },
    },
  },
});

export default theme;
