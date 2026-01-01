import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00adef",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#0a0a0a",
      paper: "#161616",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    h2: {
      fontWeight: 700,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
    },
  },
});
