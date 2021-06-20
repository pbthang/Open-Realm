import React from "react";
import AppShell from "../components/AppShell";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
    transition: "color 0.2s ease",
    "&:visited": {
      color: "inherit",
    },
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
}));

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
