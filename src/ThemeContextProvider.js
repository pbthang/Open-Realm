import React, { useState } from "react";
import { CssBaseline } from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";

const lightTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "light",
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
    },
  })
);

const darkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "dark",
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
    },
  })
);

export const ThemeContext = React.createContext(false);

function ThemeContextProvider({ children }) {
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
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
