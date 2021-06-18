import React, { useState, useEffect } from "react";
import axios from "axios";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../api/api";
import { useAuth0 } from "@auth0/auth0-react";
import UserDataService from "../../services/user.service";
import PromptDataService from "../../services/prompt.service";
import WritingDataService from "../../services/writing.service";

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
  const { user } = useAuth0();

  const [marked, setMarked] = useState(false);
  const [number, setNumber] = useState(book.numberOfBookmarks ?? 0);

  const [userBookmarkedPrompts, setUserBookmarkedPrompts] = useState([]);
  const [userBookmarkedWritings, setUserBookmarkedWritings] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await UserDataService.get(user.sub);
      const userMetadata = response.data.user_metadata;
      setUserBookmarkedPrompts(userMetadata.bookmarkedPrompts);
      setUserBookmarkedWritings(userMetadata.bookmarkedWritings);
      setMarked(
        type === "prompt"
          ? userMetadata.bookmarkedPrompts.find((id) => id === book.id) >= 0
          : userMetadata.bookmarkedWritings.find((id) => id === book.id) >= 0
      );
    };

    const getPromptInfo = async () => {
      const response = await PromptDataService.get(book.id);
      setNumber(response.data.numberOfBookmarks);
    };

    const getWritingInfo = async () => {
      const response = await WritingDataService.get(book.id);
      setNumber(response.data.numberOfBookmarks);
    };

    getUserInfo();
    if (type === "prompt") {
      getPromptInfo();
    } else if (type === "writing") {
      getWritingInfo();
    }
  }, [user.sub, book.id, type]);

  const handleClick = async () => {
    if (type === "prompt") {
      let newUserBookmarkedPrompts = userBookmarkedPrompts;
      if (marked) {
        newUserBookmarkedPrompts = newUserBookmarkedPrompts.filter(
          (promptId) => promptId !== book.id
        );
        PromptDataService.update(book.id, {
          ...book,
          numberOfBookmarks: number - 1,
        });
        setNumber((number) => {
          return number - 1;
        });
        setMarked((marked) => !marked);
      } else {
        newUserBookmarkedPrompts = [book.id, ...newUserBookmarkedPrompts];
        PromptDataService.update(book.id, {
          ...book,
          numberOfBookmarks: number + 1,
        });
        setNumber((number) => {
          return number + 1;
        });
        setMarked((marked) => !marked);
      }
      try {
        const response = await UserDataService.patch(user.sub, {
          user_metadata: {
            bookmarkedPrompts: newUserBookmarkedPrompts,
          },
        });
      } catch (error) {
        console.error(error);
      }
    } else if (type === "writing") {
      let newUserBookmarkedWritings = userBookmarkedWritings;
      if (marked) {
        newUserBookmarkedWritings = newUserBookmarkedWritings.filter(
          (writingId) => writingId !== book.id
        );
        PromptDataService.update(book.id, {
          ...book,
          numberOfBookmarks: number - 1,
        });
        setNumber((number) => {
          return number - 1;
        });
        setMarked(!marked);
      } else {
        newUserBookmarkedWritings = [book.id, ...newUserBookmarkedWritings];
        PromptDataService.update(book.id, {
          ...book,
          numberOfBookmarks: number + 1,
        });
        setNumber((number) => {
          return number + 1;
        });
        setMarked(!marked);
      }
      try {
        const response = await UserDataService.patch(user.sub, {
          user_metadata: {
            bookmarkedWritings: newUserBookmarkedWritings,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <span className={classes.root}>
      {marked ? (
        <BookmarkIcon className={classes.icon} onClick={handleClick} />
      ) : (
        <BookmarkBorderIcon className={classes.icon} onClick={handleClick} />
      )}
      <span className={classes.number}>{number ?? ""}</span>
    </span>
  );
}

export default Bookmark;
