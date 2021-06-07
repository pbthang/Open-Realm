import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    width: "80vw",
    wordWrap: "break-word",
    padding: theme.spacing(3),
  },
}));

function AppShell({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar />
      <Sidebar />
      <div>
        <Toolbar></Toolbar>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
}

export default AppShell;
