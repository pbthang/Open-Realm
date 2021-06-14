import React from "react";
import AppShell from "../components/AppShell";
import { Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ReactLoading from "react-loading";

const useStyles = makeStyles({
  root: {
    lineHeight: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "1rem",
  },
  loader: {
    marginRight: "1rem",
  },
});

const loadingMessage = [
  "Fetching data...",
  "Loading stuff...",
  "Chill...",
  "Rest your eyes a bit...",
  "Look away from the screen for a few seconds...",
  "Everything is fine don't panic...",
  "Stand up and move around a bit...",
];

function Loading() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <AppShell>
      <div className={classes.root}>
        <ReactLoading
          type="bars"
          color={theme.palette.primary.main}
          className={classes.loader}
        />
        <Typography variant="subtitle1">
          {loadingMessage[Math.floor(Math.random() * loadingMessage.length)]}
        </Typography>
      </div>
    </AppShell>
  );
}

export default Loading;
