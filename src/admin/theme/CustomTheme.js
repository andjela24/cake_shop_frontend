import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
    palette: {
        mode: "dark", // Set the custom color mode name here
        primary: {
            main: "#393119",
        },
        secondary: {
            main: "#c39b46",
        },
        white: {
            main: "#fff",
        },
        orange: {
            main: "#ffdb0f",
        },

        background: {
            default: "",
            // paper: '#121019',
            paper: "rgb(0, 0, 22)",
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#9155FD",
        },
        secondary: {
            main: "#f48fb1",
        },
    },
});

const customerTheme = createTheme({
    palette: {
        mode: "light", // Set the custom color mode name here
        contrastThreshold: 4.5,
        primary: {
            main: "#393119",
        },
        secondary: {
            main: "#c39b46",
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
            // paper: '#121019',
            paper: "white",
        },
    },
});

export { customTheme, darkTheme, customerTheme };
