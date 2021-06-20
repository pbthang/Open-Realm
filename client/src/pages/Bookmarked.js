import React, { useState, useEffect } from "react";
import AppShell from "../components/AppShell";
import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";
import PromptDataService from "../services/prompt.service";
import WritingDataService from "../services/writing.service";
import PromptBookmarkDataService from "../services/promptBookmark.service";
import WritingBookmarkDataService from "../services/writingBookmark.service";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: "1rem",
  },
}));

function Bookmarked() {
  const classes = useStyles();
  const { user } = useAuth0();

  const [bookmarkedPrompts, setBookmarkedPrompts] = useState([]);
  const [bookmarkedWritings, setBookmarkedWritings] = useState([]);

  useEffect(() => {
    const getBookmarkedPrompts = async () => {
      const response = await PromptBookmarkDataService.findByUserId(user.sub);
      setBookmarkedPrompts(response.data.map((item) => item.prompt_id));
    };

    const getBookmarkedWritings = async () => {
      const response = await WritingBookmarkDataService.findByUserId(user.sub);
      setBookmarkedWritings(response.data.map((item) => item.writing_id));
    };

    getBookmarkedPrompts();
    getBookmarkedWritings();
  }, [user.sub]);

  return (
    <AppShell>
      <div>
        <Typography variant="h2">Bookmarked Works</Typography>
        <Divider />
        <Typography variant="h3" className={classes.title}>
          Bookmarked Prompts
        </Typography>
        <div>{JSON.stringify(bookmarkedPrompts)}</div>
        <Divider />
        <Typography variant="h3" className={classes.title}>
          Bookmarked Writings
        </Typography>
        <div>{JSON.stringify(bookmarkedWritings)}</div>
      </div>
    </AppShell>
  );
}

export default Bookmarked;
