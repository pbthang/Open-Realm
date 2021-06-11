import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthProviderWithHistory from "./AuthProviderWithHistory";
import { CssBaseline } from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: "#563d7c",
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

ReactDOM.render(
  <AuthProviderWithHistory>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </AuthProviderWithHistory>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
