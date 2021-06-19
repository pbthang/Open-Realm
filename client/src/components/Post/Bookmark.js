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
import { CircularProgress } from "@material-ui/core";

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
  }, [book.id, type, user.sub]);

  useEffect(() => {
    const updateNumberOfBookmarks = async () => {
      PromptDataService.update(book.id, { numberOfBookmarks: number });
    };

    updateNumberOfBookmarks();
    // eslint-disable-next-line
  }, [number, JSON.stringify(userBookmarkedPrompts)]);

  useEffect(() => {
    const updateBookmarkedPrompts = async () => {
      const response = await UserDataService.patch(user.sub, {
        user_metadata: {
          bookmarkedPrompts: userBookmarkedPrompts,
        },
      });
      console.log(response.data);
    };
    updateBookmarkedPrompts();
  }, [user.sub, JSON.stringify(userBookmarkedPrompts)]);

  // for BookmarkIcon
  const handleClickMarked = async () => {
    if (type === "prompt") {
      console.log("Previous (marked): ", userBookmarkedPrompts);
      setUserBookmarkedPrompts((prompts) => {
        return prompts.filter((id) => id !== book.id);
      });
      console.log("After (marked): ", userBookmarkedPrompts);
      setNumber((num) => num - 1);
      setMarked((mark) => !mark);
    } else if (type === "writing") {
    }
  };

  // for BookmarkIconBorder
  const handleClickNotMarked = async () => {
    if (type === "prompt") {
      console.log("Previous (not marked): ", userBookmarkedPrompts);
      setUserBookmarkedPrompts((prompts) => {
        return [...prompts, book.id];
      });
      console.log("After (not marked): ", userBookmarkedPrompts);
      setNumber((num) => num + 1);
      setMarked((mark) => !mark);
    } else if (type === "writing") {
    }
  };

  return (
    <span className={classes.root}>
      {marked ? (
        <BookmarkIcon className={classes.icon} onClick={handleClickMarked} />
      ) : (
        <BookmarkBorderIcon
          className={classes.icon}
          onClick={handleClickNotMarked}
        />
      )}
      <span className={classes.number}>{number ?? ""}</span>
    </span>
  );
}

export default Bookmark;
