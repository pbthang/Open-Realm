import React, { useState, useEffect } from "react";
import AppShell from "../components/AppShell";
import Post from "../components/Post";
import Loading from "./Loading";
import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { useAuth0 } from "@auth0/auth0-react";
import PromptBookmarkDataService from "../services/promptBookmark.service";
import WritingBookmarkDataService from "../services/writingBookmark.service";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 0 1rem 2rem",
  },
  title: {
    margin: "1rem",
  },
  bookmarkedWorks: {
    marginBottom: "1rem",
    display: "flex",
    flexWrap: "wrap",
  },
}));

function Bookmarked() {
  const classes = useStyles();
  const { user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [bookmarkedPrompts, setBookmarkedPrompts] = useState([]);
  const [bookmarkedWritings, setBookmarkedWritings] = useState([]);

  useEffect(() => {
    const getBookmarkedPrompts = async () => {
      try {
        setLoading(true);
        const response = await PromptBookmarkDataService.findByUserId(user.sub);
        response.data &&
          setBookmarkedPrompts(
            response.data.map((item) => ({
              id: item.id,
              title: item.title,
              author_id: item.author_id,
              numberOfBookmarks: item.numberOfBookmarks,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              published: item.published,
              comments_id: item.comments_id,
            }))
          );
      } catch (error) {
        enqueueSnackbar("Error loading bookmarked prompts", {
          variant: "error",
        });
      }
    };

    const getBookmarkedWritings = async () => {
      try {
        setLoading(true);
        const response = await WritingBookmarkDataService.findByUserId(
          user.sub
        );
        response.data &&
          setBookmarkedWritings(
            response.data.map((item) => ({
              id: item.id,
              title: item.title,
              author_id: item.author_id,
              numberOfBookmarks: item.numberOfBookmarks,
              published: item.published,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              comments_id: item.comments_id,
              prompt_id: item.prompt_id,
            }))
          );
      } catch (error) {
        enqueueSnackbar("Error loading bookmarked writings", {
          variant: "error",
        });
      }
    };

    if (user?.sub) {
      Promise.all([getBookmarkedPrompts(), getBookmarkedWritings()]).then(() =>
        setLoading(false)
      );
    }
  }, [user?.sub, enqueueSnackbar]);

  if (loading) return <Loading />;

  return (
    <AppShell>
      <div className={classes.root}>
        {bookmarkedPrompts.length > 0 && (
          <>
            <Divider />
            <Typography variant="h3" className={classes.title}>
              Bookmarked Prompts
            </Typography>
            <div className={classes.bookmarkedWorks}>
              {bookmarkedPrompts.map((prompt) => (
                <Post type="prompt" book={prompt} key={prompt?.id} />
              ))}
            </div>
          </>
        )}
        {bookmarkedWritings.length > 0 && (
          <>
            <Divider />
            <Typography variant="h3" className={classes.title}>
              Bookmarked Writings
            </Typography>
            <div className={classes.bookmarkedWorks}>
              {bookmarkedWritings.map((writing) => (
                <Post type="writing" book={writing} key={writing.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}

export default Bookmarked;
