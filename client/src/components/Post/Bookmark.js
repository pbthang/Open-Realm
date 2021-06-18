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

  const [userBookmarkedPrompts, setUserBookmarkedPrompts] = useState();
  const [userBookmarkedWritings, setUserBookmarkedWritings] = useState();

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
  }, []);

  const handleClickMarked = async () => {
    if (type === "prompt") {
      console.log("Previous (marked): ", userBookmarkedPrompts);
      setUserBookmarkedPrompts((prompts) =>
        prompts.filter((id) => id !== book.id)
      );
      console.log("After (marked): ", userBookmarkedPrompts);
      console.log(userBookmarkedPrompts);
      setNumber((num) => num - 1);
      setMarked((mark) => !mark);
      PromptDataService.update(book.id, { numberOfBookmarks: number });
      const response = await UserDataService.patch(user.sub, {
        user_metadata: {
          bookmarkedPrompts: userBookmarkedPrompts,
        },
      });
      console.log(response.data);
    } else if (type === "writing") {
    }
  };

  const handleClickNotMarked = async () => {
    if (type === "prompt") {
      console.log("Previous (not marked): ", userBookmarkedPrompts);
      setUserBookmarkedPrompts((prompts) => [...prompts, book.id]);
      console.log("After (not marked): ", userBookmarkedPrompts);
      console.log(userBookmarkedPrompts);
      setNumber((num) => num + 1);
      setMarked((mark) => !mark);
      PromptDataService.update(book.id, { numberOfBookmarks: number - 1 });
      const response = await UserDataService.patch(user.sub, {
        user_metadata: {
          bookmarkedPrompts: userBookmarkedPrompts,
        },
      });
      console.log(response.data);
    } else if (type === "writing") {
    }
  };

  const handleClick = async () => {
    if (type === "prompt") {
      let newUserBookmarkedPrompts = userBookmarkedPrompts;

      if (marked) {
        newUserBookmarkedPrompts = userBookmarkedPrompts.filter(
          (promptId) => promptId !== book.id
        );

        console.log(userBookmarkedPrompts);
        console.log(newUserBookmarkedPrompts);

        setUserBookmarkedPrompts(newUserBookmarkedPrompts);
        PromptDataService.update(book.id, {
          numberOfBookmarks: number - 1,
        });
        setNumber((number) => {
          return number - 1;
        });
        setMarked((marked) => !marked);
      } else {
        newUserBookmarkedPrompts = [...userBookmarkedPrompts, book.id];

        console.log(userBookmarkedPrompts);
        console.log(newUserBookmarkedPrompts);

        setUserBookmarkedPrompts(newUserBookmarkedPrompts);
        PromptDataService.update(book.id, {
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
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else if (type === "writing") {
      let newUserBookmarkedWritings = userBookmarkedWritings;

      if (marked) {
        newUserBookmarkedWritings = newUserBookmarkedWritings.filter(
          (writingId) => writingId !== book.id
        );
        setUserBookmarkedWritings(newUserBookmarkedWritings);
        WritingDataService.update(book.id, {
          numberOfBookmarks: number - 1,
        });
        setNumber((number) => {
          return number - 1;
        });
        setMarked(!marked);
      } else {
        newUserBookmarkedWritings = [book.id, ...newUserBookmarkedWritings];
        setUserBookmarkedWritings(newUserBookmarkedWritings);
        WritingDataService.update(book.id, {
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
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
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
