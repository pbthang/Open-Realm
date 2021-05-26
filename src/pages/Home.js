import React from "react";
import AppShell from "../components/AppShell";
import Post from "../components/Post";
import { makeStyles } from "@material-ui/core/styles";
import books from "../components/Post/testBooks";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  container: {},
});

function Home() {
  const classes = useStyles();

  return (
    <AppShell className={classes.root}>
      {books.map((book) => (
        <Post book={book} />
      ))}
    </AppShell>
  );
}

export default Home;
