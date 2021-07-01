import React, { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import Post from "../components/Post";
import Loading from "./Loading";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
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
  const { enqueueSnackbar } = useSnackbar();

  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(false);

  const retrievePrompts = async () => {
    const response = await PromptDataService.getAll();
    return response.data;
  };

  useEffect(() => {
    const getAllPrompts = async () => {
      try {
        setLoading(true);
        const allPrompts = await retrievePrompts();
        allPrompts && setPrompts(allPrompts);
        setLoading(false);
      } catch (error) {
        enqueueSnackbar("Error loading prompts", { variant: "error" });
        setLoading(false);
      }
    };

    getAllPrompts();
  }, []);

  if (loading) return <Loading />;

  return (
    <AppShell>
      <div className={classes.root} id="homePostContainer">
        {prompts.map((prompt) => (
          <Post type="prompt" book={prompt} key={prompt?.id} />
        ))}
      </div>
    </AppShell>
  );
}

export default Home;
