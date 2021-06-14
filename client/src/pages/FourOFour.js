import React from "react";
import AppShell from "../components/AppShell";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "1rem",
  },
  message: {
    margin: "1rem",
  },
  link: {
    color: "inherit",
    cursor: "pointer",
    "&:visited": {
      color: "inherit",
    },
    "&:hover": {
      color: "inherit",
    },
  },
});

function FourOFour() {
  const classes = useStyles();

  return (
    <AppShell>
      <div className={classes.root}>
        <Typography variant="h2">404 - Page Not Found</Typography>
        <Typography variant="body1" className={classes.message}>
          Click{" "}
          <a href="/home" className={classes.link}>
            here
          </a>{" "}
          to go to Home Page
        </Typography>
      </div>
    </AppShell>
  );
}

export default FourOFour;
