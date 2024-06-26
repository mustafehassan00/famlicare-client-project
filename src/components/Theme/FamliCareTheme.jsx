import { createTheme } from "@mui/material/styles";
import { lighten, darken } from "@mui/system/colorManipulator";

// Utility function to generate color variants for the theme
const generateColorVariants = (color) => ({
  main: color, // Original color
  light: lighten(color, 0.3), // Lightened variant
  dark: darken(color, 0.1), // Darkened variant
});

// Font family declarations
const libelSuitReg = "'libel', sans-serif";
const acuminProCondensed = "'Acumin Pro', sans-serif";
const maryDale = "'Marydale', sans-serif";

// Color palette for the theme, using the utility function for variants
const colors = {
  darkTeal: generateColorVariants("#2a788b"),
  orange: generateColorVariants("#eaac60"),
  green: generateColorVariants("#c2c76c"),
  darkGray: generateColorVariants("#3B3A39"),
  head_text: generateColorVariants("#406E7B"),
  light_text: generateColorVariants("#98A9AE"),
  text: generateColorVariants("#889BA1"),
  title_text: generateColorVariants("#69878E"),
  white: "#fff", // No variants needed for white
};

// Main theme configuration
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // Extra small devices
      sm: 600, // Small devices
      md: 960, // Medium devices
      lg: 1280, // Large devices
      xl: 1920, // Extra large devices
    },
  },
  palette: {
    // Assigning color variants to different parts of the UI
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
    // Global font family setup
    fontFamily: `${libelSuitReg}, ${acuminProCondensed}, ${maryDale}`,
    // Specific typography variants
    h1: { fontSize: "2.5rem", fontFamily: libelSuitReg },
    h2: { fontWeight: 500, fontSize: "1.5em", fontFamily: libelSuitReg },
    h3: { fontWeight: 500, fontSize: "1em", fontFamily: libelSuitReg },
    body1: { lineHeight: 1.6, fontFamily: acuminProCondensed },
    callout: { fontFamily: libelSuitReg },
    feature: { fontFamily: maryDale },
  },
  components: {
    // Component-specific style overrides
    MuiAppBar: {
      styleOverrides: {
        root: {
          flexDirection: 'column',
          alignItems: 'center',
          '@media (min-width:960px)': {
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: acuminProCondensed,
          fontWeight: 500,
          borderRadius: 18
        },
        contained: {
          "&.primary": {
            backgroundColor: colors.orange.main,
            color: colors.white,
            "&:hover": { backgroundColor: colors.orange.dark },
            "&.off": {
              backgroundColor: colors.orange.light,
              color: colors.white,
            },
          },
          // Button size variants
          "&.small": {
            padding: "6px 16px",
            fontSize: "0.875rem",
            "&.on": {
              backgroundColor: colors.orange.main,
              color: colors.white,
              "&:hover": { backgroundColor: colors.orange.dark },
            },
            "&.off": {
              color: colors.orange.dark,
              borderColor: colors.orange.dark,
              backgroundColor: "transparent",
            },
          },
          "&.pop-up": {
            "&.on": {
              backgroundColor: colors.darkTeal.main,
              color: colors.white,
              "&:hover": { backgroundColor: colors.darkTeal.dark },
            },
            "&.off": {
              color: colors.darkTeal.main,
              borderColor: colors.darkTeal.main,
              backgroundColor: "transparent",
              "&:hover": { borderColor: colors.darkTeal.dark },
            },
          },
          "&.medium": {
            padding: "8px 20px",
            fontSize: "0.9375rem",
            "&.on": {
              backgroundColor: colors.orange.main,
              color: colors.white,
              "&:hover": { backgroundColor: colors.orange.dark },
            },
            "&.off": {
              color: colors.orange.main,
              borderColor: colors.orange.main,
              backgroundColor: "transparent",
              "&:hover": { borderColor: colors.orange.dark },
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
    MuiInput: {
      styleOverrides: {
        root: {
          lineHeight: 1.6,
          fontFamily: acuminProCondensed,
          borderRadius: 4,
          backgroundColor: colors.white,
          border: "1px solid #ced4da",
          fontSize: 16,
          padding: "10px 12px",
          "& .MuiInputBase-input::placeholder": {
            fontFamily: acuminProCondensed,
            fontSize: 16,
            fontWeight: "normal",
            color: colors.light_text.main,
          },
          "&:hover": {
            borderColor: "#b0bec5",
          },
          "&.Mui-focused": {
            borderColor: colors.darkTeal.main,
            boxShadow: `0 0 0 2px ${colors.darkTeal.light}`,
          },
          "&.Mui-error": {
            borderColor: "#f44336",
          },
          "&.Mui-disabled": {
            backgroundColor: "#e0e0e0",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          lineHeight: 1.6,
          fontFamily: acuminProCondensed,
          borderRadius: 4,
          backgroundColor: colors.white,
          border: "1px solid #ced4da",
          fontSize: 16,
          padding: "10px 12px",
          "& .MuiInputBase-input::placeholder": {
            fontFamily: acuminProCondensed,
            fontSize: 16,
            fontWeight: "normal",
            color: colors.light_text.main,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#b0bec5",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.darkTeal.main,
            borderWidth: 2,
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "#f44336",
          },
          "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e0e0e0",
          },
        },
        notchedOutline: {
          borderColor: "#ced4da",
        },
        input: {
          padding: "10px 12px",
        },
      },
    },
  },
});

export { theme as default };