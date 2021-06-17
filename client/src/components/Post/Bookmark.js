import React, { useState, useEffect } from "react";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../api/api";

const useStyles = makeStyles({
  root: {
    display: "inline-flex",
    alignItems: "center",
  },
  icon: {
    cursor: "pointer",
  },
  number: {
    fontSize: "1rem",
  },
});

function Bookmark({ type, book }) {
  const classes = useStyles();

  const initialMarked = false;

  const [marked, setMarked] = useState(initialMarked);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    setNumber(parseInt(book.numberOfBookmarks, 10));
    // eslint-disable-next-line
  }, [JSON.stringify(book)]);

  useEffect(() => {
    const updateBookmarkNumber = async () => {
      try {
        await api.put(
          `/${type === "chapter" ? "chapters" : "stories"}/${book.id}`,
          {
            ...book,
            numberOfBookmarks: number.toString(),
          }
        );
      } catch (err) {
        console.log(err);
      }
    };

    number && updateBookmarkNumber();
    // eslint-disable-next-line
  }, [number, JSON.stringify(book), type]);

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
      <span className={classes.number}>{!!number ?? ""}</span>
    </span>
  );
}

export default Bookmark;
