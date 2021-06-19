import React, { useState, useEffect } from "react";
import axios from "axios";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";
import UserDataService from "../../services/user.service";
import PromptDataService from "../../services/prompt.service";
import WritingDataService from "../../services/writing.service";
import PromptBookmarkDataService from "../../services/promptBookmark.service";
import WritingBookmarkDataService from "../../services/writingBookmark.service";

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

  useEffect(() => {
    const getUserInfo = async () => {
      if (type === "prompt") {
        const promptResponse = await PromptBookmarkDataService.findByUserId(
          user.sub
        );
        setMarked(promptResponse.data.find((obj) => obj.prompt_id === book.id));
      } else if (type === "writing") {
        const writingResponse = await WritingBookmarkDataService.findByUserId(
          user.sub
        );
        setMarked(
          writingResponse.data.find((obj) => obj.prompt_id === book.id)
        );
      }
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

  // for BookmarkIcon
  const handleClickMarked = async () => {
    if (type === "prompt") {
      await PromptBookmarkDataService.deleteByUserAndPrompt(user.sub, book.id);
      await PromptDataService.update(book.id, {
        numberOfBookmarks: number - 1,
      });
    } else if (type === "writing") {
      await WritingBookmarkDataService.deleteByUserAndPrompt(user.sub, book.id);
      await WritingDataService.update(book.id, {
        numberOfBookmarks: number - 1,
      });
    }
    setNumber((num) => num - 1);
    setMarked((mark) => !mark);
  };

  // for BookmarkIconBorder
  const handleClickNotMarked = async () => {
    if (type === "prompt") {
      await PromptBookmarkDataService.create({
        user_id: user.sub,
        prompt_id: book.id,
      });
      const response = await PromptDataService.update(book.id, {
        numberOfBookmarks: number + 1,
      });
      console.log(response.data);
    } else if (type === "writing") {
      await WritingBookmarkDataService.create({
        user_id: user.sub,
        prompt_id: book.id,
      });
      const response = await WritingDataService.update(book.id, {
        numberOfBookmarks: number + 1,
      });
      console.log(response.data);
    }
    setNumber((num) => num + 1);
    setMarked((mark) => !mark);
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
