import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: 0,
    padding: 0,
  },
  content: {
    flexGrow: 1,
    width: "calc(100vw - 220px)",
    height: "100%",
    wordWrap: "break-word",
    paddingRight: 0,
    [theme.breakpoints.down("md")]: {
      width: "95vw",
    },
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
