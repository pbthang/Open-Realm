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
    <AppShell>
      <div className={classes.root}>
        {prompts.map((prompt) => (
          <Post type="prompt" book={prompt} key={prompt?.id} />
        ))}
      </div>
    </AppShell>
  );
}

export default Home;
