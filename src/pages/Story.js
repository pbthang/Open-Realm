import React from "react";
import AppShell from "../components/AppShell";
import Bookmark from "../components/Post/Bookmark";
import books from "../components/Post/testBooks";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {
    margin: "1rem",
  },
  title: {
    marginBottom: "1rem",
  },
  content: {
    marginTop: "1rem",
  },
});

function Story() {
  const classes = useStyle();
  const { bookId } = useParams();

  const book = books.find((b) => b.id === parseInt(bookId));

  return (
    <AppShell>
      <div className={classes.root}>
        <Typography variant="h2" className={classes.title}>
          {bookId}. {book.title}
        </Typography>
        <Bookmark book={book} />
        <Typography variant="body1" className={classes.content}>
          {book.content}
        </Typography>
      </div>
    </AppShell>
  );
}

export default Story;
