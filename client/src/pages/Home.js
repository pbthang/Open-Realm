import React, { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import Post from "../components/Post";
import { makeStyles } from "@material-ui/core/styles";
import PromptDataService from "../services/prompt.service";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  container: {},
});

function Home() {
  const classes = useStyles();
  const [prompts, setPrompts] = useState([]);

  const retrievePrompts = async () => {
    const response = await PromptDataService.getAll();
    return response.data;
  };

  useEffect(() => {
    const getAllPrompts = async () => {
      const allPrompts = await retrievePrompts();
      if (allPrompts) setPrompts(allPrompts);
    };

    getAllPrompts();
  }, []);

  return (
    <AppShell className={classes.root}>
      {prompts.map((prompt, idx) => (
        <Post type="prompt" book={prompt} author={prompt.author} key={idx} />
      ))}
    </AppShell>
  );
}

export default Home;
