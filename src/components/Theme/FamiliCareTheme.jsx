import { createTheme } from "@mui/material/styles";
import { lighten, darken } from "@mui/material/styles/colorManipulator";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2a788b", //Dark Teal
    },
    secondary: {
      main: "#eaac60", //Orange
      light: "#FED29C",
    },
    tertiary: {
      main: "#c2c76c", //Green
    },
  },
  typography: {
    fontFamily:
      '"Libel-Suit Reg", "Acumin Pro Condensed", "MaryDale", sans-serif',
    h1: {
      fontWeight: 500,
      fontSize: "2.5rem",
      fontFamily: "Libel-Suit Reg",
    },
    h2: {
      fontWeight: 500,
      fontFamily: "Libel-Suit Reg",
    },
    body1: {
      lineHeight: 1.6,
      fontFamily: "Acumin Pro Condensed",
    },
    callout: {
      fontFamily: "Libel-Suit Reg",
    },
    feature: {
      fontFamily: "MaryDale",
    },
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
            backgroundColor: theme.palette.secondary.main,
            color: "#fff",
            "&:hover": {
              backgroundColor: darken(theme.palette.secondary.main, 0.1),
            },
            "&.off": {
              backgroundColor: lighten(theme.palette.secondary.main, 0.3),
              color: theme.palette.secondary.main,
            },
          },
          "&.tertiary": {
            backgroundColor: theme.palette.tertiary.main,
            color: "#fff",
            "&:hover": {
              backgroundColor: darken(theme.palette.tertiary.main, 0.1),
            },
          },
          "&.primarySmall": {
            width: "50%",
            "&.on": {
              backgroundColor: theme.palette.secondary.main,
              color: "#fff",
            },
          },
          "&.popup": {
            fontSize: "0.8rem",
            padding: "4px 8px",
            "&.on": {
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
            },
          },
          "&.secondarySmall": {
            width: "75%",
            "&.on": {
              backgroundColor: theme.palette.secondary.light,
              color: "#fff",
            },
          },
        },
        outlined: {
          borderRadius: 18,
          "&.secondary": {
            color: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            "&:hover": {
              borderColor: darken(theme.palette.secondary.main, 0.1),
            },
            "&.off": {
              color: darken(theme.palette.secondary.main, 0.2),
              borderColor: darken(theme.palette.secondary.main, 0.2),
            },
          },
          "&.primarySmall": {
            width: "50%",
            "&.off": {
              color: theme.palette.secondary.main,
              borderColor: theme.palette.secondary.main,
            },
          },
          "&.popup": {
            fontSize: "0.8rem",
            padding: "4px 8px",
            "&.off": {
              color: theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
            },
          },
          "&.secondarySmall": {
            width: "75%",
            "&.off": {
              color: theme.palette.secondary.main,
              borderColor: theme.palette.secondary.main,
            },
          },
        },
      },
    },
  },
});

export default theme;