import React, { useState, useEffect } from "react";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useAuth0 } from "@auth0/auth0-react";
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
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState();

  const [marked, setMarked] = useState(false);
  const [number, setNumber] = useState(book.numberOfBookmarks ?? 0);

  useEffect(() => {
    const getUserInfo = async () => {
      setLoading(true);
      if (type === "prompt") {
        try {
          const promptResponse = await PromptBookmarkDataService.findByUserId(
            user.sub
          );
          setMarked(promptResponse.data.find((obj) => obj.id === book.id));
        } catch (error) {
          enqueueSnackbar("Error loading bookmark info", { variant: "error" });
        }
      } else if (type === "writing") {
        try {
          const writingResponse = await WritingBookmarkDataService.findByUserId(
            user.sub
          );
          setMarked(writingResponse.data.find((obj) => obj.id === book.id));
        } catch (error) {
          enqueueSnackbar("Error loading bookmark info", { variant: "error" });
        }
      }
      setLoading(false);
    };

    const getPromptInfo = async () => {
      if (!book.id) return;
      try {
        const response = await PromptDataService.get(book.id);
        setNumber(response.data.numberOfBookmarks);
      } catch (error) {
        console.error(error);
      }
    };

    const getWritingInfo = async () => {
      try {
        if (!book.id) return;
        const response = await WritingDataService.get(book.id);
        setNumber(response.data.numberOfBookmarks);
      } catch (error) {
        console.error(error);
      }
    };
    if (user?.sub) {
      getUserInfo();
    }

    if (type === "prompt" && book?.id) {
      getPromptInfo();
    } else if (type === "writing" && book?.id) {
      getWritingInfo();
    }
  }, [book.id, type, user.sub]);

  // for BookmarkIcon
  const handleClickMarked = async () => {
    setLoading(true);
    if (type === "prompt") {
      try {
        await PromptBookmarkDataService.deleteByUserAndPrompt(
          user.sub,
          book.id
        );
        await PromptDataService.update(book.id, {
          numberOfBookmarks: number - 1,
        });
      } catch (error) {
        enqueueSnackbar("Error updating bookmark", { variant: "error" });
      }
    } else if (type === "writing") {
      try {
        await WritingBookmarkDataService.deleteByUserAndWriting(
          user.sub,
          book.id
        );
        await WritingDataService.update(book.id, {
          numberOfBookmarks: number - 1,
        });
      } catch (error) {
        enqueueSnackbar("Error updating bookmark", { variant: "error" });
      }
    }
    setLoading(false);
    setNumber((num) => num - 1);
    setMarked((mark) => !mark);
  };

  // for BookmarkIconBorder
  const handleClickNotMarked = async () => {
    setLoading(true);
    if (type === "prompt") {
      try {
        await PromptBookmarkDataService.create({
          user_id: user.sub,
          prompt_id: book.id,
        });
        await PromptDataService.update(book.id, {
          numberOfBookmarks: number + 1,
        });
      } catch (error) {
        enqueueSnackbar("Error updating bookmark", { variant: "error" });
      }
    } else if (type === "writing") {
      try {
        await WritingBookmarkDataService.create({
          user_id: user.sub,
          writing_id: book.id,
        });
        await WritingDataService.update(book.id, {
          numberOfBookmarks: number + 1,
        });
      } catch (error) {
        enqueueSnackbar("Error updating bookmark", { variant: "error" });
      }
    }
    setLoading(false);
    setNumber((num) => num + 1);
    setMarked((mark) => !mark);
  };

  if (loading) return <CircularProgress color="inherit" size={30} />;

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
      <span className={classes.number}>{number ?? book.numberOfBookmarks}</span>
    </span>
  );
}

export default Bookmark;
