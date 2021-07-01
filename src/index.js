import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ThemeContextProvider from "./ThemeContextProvider";
import reportWebVitals from "./reportWebVitals";
import AuthProviderWithHistory from "./AuthProviderWithHistory";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <AuthProviderWithHistory>
    <ThemeContextProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        preventDuplicate
      >
        <App />
      </SnackbarProvider>
    </ThemeContextProvider>
  </AuthProviderWithHistory>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
