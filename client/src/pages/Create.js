import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppShell from "../components/AppShell";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Paper,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ckeditorConfig from "../config/ckeditorConfig";
import parse from "html-react-parser";
import http from "../http-common";
import PromptDataService from "../services/prompt.service";
import WritingDataService from "../services/writing.service";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles({
  root: {
    display: "block",
  },
  title: {
    width: "100%",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  content: {
    width: "100%",
  },
  editorContainer: {
    width: "100%",
    marginTop: "1rem",
    marginBottom: "1rem",
    padding: "5px",
    color: "#000",
  },
  btn: {
    margin: "0 0.5rem",
  },
  typeChoose: {
    marginTop: "1rem",
  },
  promptOption: {
    // wordWrap: "normal",
  },
});

function Create() {
  const classes = useStyles();

  const history = useHistory();
  const { user } = useAuth0();

  const [content, setContent] = useState(
    window.localStorage.getItem("createCache") ?? ""
  );

  const [title, setTitle] = useState(
    window.localStorage.getItem("titleCache") ?? ""
  );

  // type can be PROMPT | WRITING
  const PROMPT = "prompt_type";
  const WRITING = "writing_type";
  const [type, setType] = useState(
    window.localStorage.getItem("type") ?? PROMPT
  );

  const [promptList, setPromptList] = useState([]);

  // const [currentPromptId, setCurrentPromptId] = useState(
  //   window.localStorage.getItem("promptCache") ?? 0
  // );

  const [currentPrompt, setCurrentPrompt] = useState(
    JSON.parse(window.localStorage.getItem("promptCache")) ?? null
  );

  // useEffect(() => {
  //   setCurrentPrompt(promptList.find((p) => p.id == currentPromptId));
  //   // eslint-disable-next-line
  // }, [currentPromptId, JSON.stringify(promptList)]);

  const handleOnTypeChange = (e) => {
    setType(e.target.value);
    window.localStorage.setItem("type", e.target.value);
  };

  const handleOnContentChange = (e, editor) => {
    const data = editor.getData();
    setContent(data);
    window.localStorage.setItem("createCache", data);
  };

  const handleOnPromptChange = (e, newVal) => {
    window.localStorage.setItem("promptCache", JSON.stringify(newVal));
    setCurrentPrompt(newVal);
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await http.get("/prompts");
      setPromptList(response.data);
    };
    fetchPrompts();
  }, []);

  const addPrompt = () => {
    var data = {
      author_id: user.sub,
      title: title,
      content: content,
      published: true,
    };

    if (title.length > 0 && content.length > 0) {
      PromptDataService.create(data)
        .then(() => {
          window.localStorage.clear();
          history.push("/home");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const addWriting = () => {
    const data = {
      title: title,
      author_id: user.sub,
      prompt_id: currentPrompt.id,
      content: content,
      published: true,
    };
    if (title.length > 0 && content.length > 0) {
      WritingDataService.create(data)
        .then(() => {
          window.localStorage.clear();
          history.push(`/home/${currentPrompt.id}`);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <AppShell>
      <Typography variant="h3">
        Create a {type === PROMPT ? "prompt" : "writing"}
      </Typography>
      <FormControl className={classes.typeChoose}>
        <InputLabel shrink id="type">
          Type
        </InputLabel>
        <Select labelId="type" value={type} onChange={handleOnTypeChange}>
          <MenuItem value={PROMPT}>New Prompt</MenuItem>
          <MenuItem value={WRITING}>New Writing</MenuItem>
        </Select>
      </FormControl>
      {type === PROMPT ? (
        <div className={classes.root}>
          <form noValidate autoComplete="off">
            <TextField
              error={title.length > 255}
              helperText={
                title.length > 255
                  ? "Title should have less than 255 characters"
                  : ""
              }
              label="Title"
              className={classes.title}
              multiline
              fullWidth
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                window.localStorage.setItem("titleCache", e.target.value);
              }}
            />
            <div className={classes.editorContainer}>
              <CKEditor
                config={ckeditorConfig}
                editor={ClassicEditor}
                data={content}
                onChange={handleOnContentChange}
              />
            </div>
          </form>
          <Paper
            style={{
              padding: "1rem",
              margin: "1rem 0",
              wordWrap: "break-word",
            }}
          >
            {parse(content)}
          </Paper>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={addPrompt}
          >
            Publish
          </Button>
        </div>
      ) : (
        <div className={classes.root}>
          <FormControl fullWidth>
            <Autocomplete
              options={promptList}
              getOptionLabel={(option) => `${option.id} - ${option.title}`}
              getOptionSelected={(option, val) =>
                option.id === val.id && option.title === val.title
              }
              openOnFocus
              forcePopupIcon={true}
              onChange={handleOnPromptChange}
              value={currentPrompt}
              noOptionsText="No prompt available"
              renderInput={(params) => (
                <TextField
                  {...params}
                  multiline
                  rowsMax={4}
                  label="Choose prompt to write about"
                  margin="normal"
                />
              )}
            />
          </FormControl>
          <form noValidate autoComplete="off">
            <TextField
              error={title.length > 255}
              helperText={
                title.length > 255
                  ? "Title should have less than 255 characters"
                  : ""
              }
              label="Title"
              className={classes.title}
              value={title}
              multiline
              onChange={(e) => {
                setTitle(e.target.value);
                window.localStorage.setItem("titleCache", e.target.value);
              }}
            />

            <Paper className={classes.editorContainer}>
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={handleOnContentChange}
              />
            </Paper>
          </form>
          <Paper
            style={{
              padding: "1rem",
              margin: "1rem 0",
              wordWrap: "normal",
            }}
          >
            {parse(content)}
          </Paper>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={addWriting}
          >
            Publish
          </Button>
        </div>
      )}
    </AppShell>
  );
}

export default Create;
