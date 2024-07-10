import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f46583",
    },
    secondary: {
      main: "#ff1",
    },
    white: {
      main: "#fff",
    },
    orange: {
      main: "#f46583",
    },
    background: {
      default: "",
      paper: "rgb(0, 0, 22)",
    },
  },
});

const customerTheme = createTheme({
  palette: {
    mode: "light",
    contrastThreshold: 4.5,
    primary: {
      main: "#393119",
    },
    secondary: {
      main: "#f46583",
    },
    white: {
      main: "#fff",
    },
    orange: {
      main: "#ffdb0f",
    },

    random: {
      main: "#000",
      light: "#fff",
    },

    background: {
      default: "",
      paper: "white",
    },
  },
});

export { customTheme, customerTheme };
