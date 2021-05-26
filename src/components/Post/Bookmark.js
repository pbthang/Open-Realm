import React, { useState, useEffect } from "react";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { makeStyles } from "@material-ui/core/styles";
import books from "./testBooks";

const initialMarked = false;

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  icon: {
    cursor: "pointer",
  },
});

function Bookmark({ book }) {
  const classes = useStyles();

  const initialNumber = book.numberOfBookmarks;

  const [marked, setMarked] = useState(initialMarked);
  const [number, setNumber] = useState(initialNumber);

  useEffect(() => {
    books.find((b) => b.id === book.id).numberOfBookmarks = number;
  }, [number, book]);

  const handleClick = () => {
    setNumber(marked ? number - 1 : number + 1);
    setMarked(!marked);
  };

  return (
    <span className={classes.root}>
      {marked ? (
        <BookmarkIcon className={classes.icon} onClick={handleClick} />
      ) : (
        <BookmarkBorderIcon className={classes.icon} onClick={handleClick} />
      )}
      <span className={classes.number}>{number}</span>
    </span>
  );
}

export default Bookmark;
