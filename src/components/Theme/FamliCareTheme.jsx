import { createTheme } from "@mui/material/styles";
import { lighten, darken } from "@mui/system/colorManipulator";

/**
 * Utility function to generate color variants for a base color.
 * This includes the main color, a lighter variant, and a darker variant for hover states.
 * @param {string} color - The base color in hex format.
 * @returns {Object} An object containing the main, light, and dark variants of the base color.
 */
const generateColorVariants = (color) => ({
  main: color,
  light: lighten(color, 0.3), // Generates a lighter variant of the base color.
  dark: darken(color, 0.1), // Generates a darker variant of the base color for hover states.
});

// Define custom fonts
const libelSuitReg = "'libel', sans-serif";
const acuminProCondensed = "'Acumin Pro', sans-serif"; 
const maryDale = "'Marydale', sans-serif";
/**
 * Base colors with variants for the theme.
 * This includes primary, secondary, tertiary colors, and specific text colors.
 */
const colors = {
  darkTeal: generateColorVariants("#2a788b"), // Used as the primary color.
  orange: generateColorVariants("#eaac60"), // Used as the secondary color.
  green: generateColorVariants("#c2c76c"), // Used as the tertiary or accent color.
  darkGray: generateColorVariants("#3B3A39"), // Used for dark text.
  head_text: generateColorVariants("#406E7B"), // Used for header text.
  light_text: generateColorVariants("#98A9AE"), // Used for lighter text.
  text: generateColorVariants("#889BA1"), // Used for general text.
  title_text: generateColorVariants("#69878E"), // Used for titles.
  white: "#fff", // Used for backgrounds and elements requiring a white color.
};

/**
 * Defines the theme with a custom color palette and typography settings.
 * The theme configuration includes palette colors, typography variants, and component overrides.
 */
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
    white: colors.white,
  },
  typography: {
    fontFamily: `${libelSuitReg}, ${acuminProCondensed}, ${maryDale}`,
    h1: { fontSize: "2.5rem", fontFamily: libelSuitReg },
    h2: { fontWeight: 500, fontSize: "1.5em", fontFamily: libelSuitReg },
    h3: { fontWeight: 500, fontSize: "1em", fontFamily: libelSuitReg },
    body1: { lineHeight: 1.6, fontFamily: acuminProCondensed },
    callout: { fontFamily: libelSuitReg },
    feature: { fontFamily: maryDale },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: libelSuitReg,
          fontWeight: 500,
        },
        contained: {
          borderRadius: 18,
          "&.primary": {
            backgroundColor: colors.orange.main, // Applies the secondary color to primary variant buttons, in this case, orange
            color: colors.white,
            "&:hover": { backgroundColor: colors.orange.dark },
            "&.off": {
              backgroundColor: colors.orange.light,
              color: colors.white,
            },
          },
          "&.small": {
            borderRadius: 12,
            padding: "6px 16px",
            fontSize: "0.875rem",
            "&.on": {
              backgroundColor: colors.orange.main, // Orange background for on state, similar to primary button style
              color: colors.white,
              "&:hover": { backgroundColor: colors.orange.dark },
            },
            "&.off": {
              color: colors.orange.dark, // Darker text when off/inactive, similar to off state of secondary button
              borderColor: colors.orange.dark, // Darker border when off/inactive
              backgroundColor: "transparent", // Ensures the background is transparent in off state
            },
          },
          "&.pop-up": {
            "&.on": {
              backgroundColor: colors.darkTeal.main, // Blue background for on state
              color: colors.white,
              "&:hover": { backgroundColor: colors.darkTeal.dark },
            },
            "&.off": {
              color: colors.darkTeal.main, // Blue text for off state
              borderColor: colors.darkTeal.main, // Blue border for off state
              backgroundColor: "transparent", // Transparent background for off state
              "&:hover": { borderColor: colors.darkTeal.dark }, // Darker border on hover for off state
            },
          },
          "&.medium": {
            padding: "8px 20px",
            fontSize: "0.9375rem",
            "&.on": {
              backgroundColor: colors.orange.main, // Orange background for on state, similar to primary button's on state
              color: colors.white,
              "&:hover": { backgroundColor: colors.orange.dark },
            },
            "&.off": {
              color: colors.orange.main, // Orange text for off state
              borderColor: colors.orange.main, // Orange border for off state
              backgroundColor: "transparent", // Transparent background for off state
              "&:hover": { borderColor: colors.orange.dark }, // Darker border on hover for off state
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "16px",
          padding: "20px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          position: "absolute",
          right: 8,
          top: 8,
          color: colors.darkTeal.main,
        },
      },
    },
  },
});

export { theme as default };
