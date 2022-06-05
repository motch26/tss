import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "#10495c",
      light: "#b7c8ce",
    },
    secondary: {
      main: "#f2ad5f",
    },
    success: {
      main: "#7ac64d",
    },
    text: {
      primary: "#10495c",
    },
  },
});

theme = responsiveFontSizes(theme);
export { theme };
