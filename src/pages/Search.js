import React, { useState } from "react";
import AppShell from "../components/AppShell";
import Post from "../components/Post";
import SectionLoading from "../components/SectionLoading";
import { TextField, Button, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import PromptDataService from "../services/prompt.service";
import WritingDataService from "../services/writing.service";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem 0 1rem 2rem",
  },
  searchForm: {
    display: "flex",
    alignItems: "center",
    margin: "1rem",
  },
  btn: {
    margin: "1rem",
  },
  result: {
    marginTop: "1rem",
  },
}));

function Search() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [promptLoading, setPromptLoading] = useState(false);
  const [writingLoading, setWritingLoading] = useState(false);

  const [searchString, setSearchString] = useState("");
  const [resultPrompts, setResultPrompts] = useState([]);
  const [resultWritings, setResultWritings] = useState([]);

  const fetchPrompts = async () => {
    setPromptLoading(true);
    try {
      const response = await PromptDataService.search(searchString);
      setResultPrompts(response.data);
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error searching prompts", { variant: "error" });
    }
    setPromptLoading(false);
  };

  const fetchWritings = async () => {
    setWritingLoading(true);
    try {
      const response = await WritingDataService.search(searchString);
      setResultWritings(response.data);
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error searching writings", { variant: "error" });
    }
    setWritingLoading(false);
  };

  const handleSearchClick = () => {
    if (!searchString)
      return enqueueSnackbar("Search field cannot be empty", {
        variant: "warning",
      });
    fetchPrompts();
    fetchWritings();
  };

  return (
    <AppShell>
      <div className={classes.root}>
        <div className={classes.searchForm}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearchClick()}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={handleSearchClick}
          >
            Search
          </Button>
        </div>
        {promptLoading ? (
          <SectionLoading msg="Loading prompts..." />
        ) : (
          resultPrompts.length > 0 && (
            <div className={classes.result}>
              <Divider />
              <Typography variant="h3">Result prompts</Typography>
              <div>
                {resultPrompts.map((prompt) => (
                  <Post type="prompt" book={prompt} key={prompt.id} />
                ))}
              </div>
            </div>
          )
        )}
        {writingLoading ? (
          <SectionLoading msg="Loading writings..." />
        ) : (
          resultWritings.length > 0 && (
            <div className={classes.result}>
              <Divider />
              <Typography variant="h3">Result writings</Typography>
              <div>
                {resultWritings.map((writing) => (
                  <Post type="writing" book={writing} key={writing.id} />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </AppShell>
  );
}

export default Search;
