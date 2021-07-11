import React, { useState } from "react";
import { CssBaseline, useTheme } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export const ThemeContext = React.createContext(false);

function ThemeContextProvider({ children }) {
  const muiTheme = useTheme();
  const getTheme = (type) =>
    createMuiTheme({
      palette: {
        type: type,
        primary: {
          main: "#6821d3",
        },
        secondary: {
          main: "#dc3545",
        },
        error: {
          main: "#dc3545",
        },
        warning: {
          main: "#ffc107",
        },
        info: {
          main: "#17a2b8",
        },
        success: {
          main: "#28a745",
        },
      },
      shape: {
        borderRadius: 10,
      },
      typography: {
        fontFamily: "Montserrat",
        h1: {
          fontSize: "5rem",
          [muiTheme.breakpoints.down("sm")]: {
            fontSize: "4rem",
          },
          [muiTheme.breakpoints.down("xs")]: {
            fontSize: "4rem",
          },
        },
        h2: {
          fontSize: "3.5rem",
          [muiTheme.breakpoints.down("sm")]: {
            fontSize: "3rem",
          },
          [muiTheme.breakpoints.down("xs")]: {
            fontSize: "2.5rem",
          },
        },
        h3: {
          fontSize: "2.5rem",
          [muiTheme.breakpoints.down("sm")]: {
            fontSize: "2.25rem",
          },
          [muiTheme.breakpoints.down("xs")]: {
            fontSize: "2rem",
          },
        },
        h4: {
          fontSize: "2rem",
          [muiTheme.breakpoints.down("sm")]: {
            fontSize: "1.75rem",
          },
          [muiTheme.breakpoints.down("xs")]: {
            fontSize: "1.5rem",
          },
        },
        h5: {
          fontSize: "1.75rem",
          [muiTheme.breakpoints.down("sm")]: {
            fontSize: "1.5rem",
          },
          [muiTheme.breakpoints.down("xs")]: {
            fontSize: "1.25rem",
          },
        },
        h6: {
          fontSize: "1.5rem",
          [muiTheme.breakpoints.down("sm")]: {},
          [muiTheme.breakpoints.down("xs")]: {
            fontSize: "1rem",
          },
        },
        subtitle1: {
          fontSize: "0.925rem",
          [muiTheme.breakpoints.down("sm")]: {},
          [muiTheme.breakpoints.down("xs")]: {},
        },
        subtitle2: {
          fontSize: "0.75rem",
          [muiTheme.breakpoints.down("sm")]: {},
          [muiTheme.breakpoints.down("xs")]: {},
        },
        body1: {
          fontSize: "1rem",
          [muiTheme.breakpoints.down("sm")]: {},
          [muiTheme.breakpoints.down("xs")]: {
            fontSize: "0.875rem",
          },
        },
        body2: {
          fontSize: "1rem",
          [muiTheme.breakpoints.down("sm")]: {},
          [muiTheme.breakpoints.down("xs")]: {
            fontSize: "0.875rem",
          },
        },
        caption: {
          fontSize: "0.75rem",
          [muiTheme.breakpoints.down("sm")]: {},
          [muiTheme.breakpoints.down("xs")]: {},
        },
      },
    });

  const [theme, setTheme] = useState(
    window.localStorage.getItem("themeCache") ||
      (window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light")
  );
  const setThemeLocally = (newTheme) => {
    setTheme(newTheme);
    window.localStorage.setItem("themeCache", newTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, setThemeLocally }}>
      <ThemeProvider theme={getTheme(theme)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
