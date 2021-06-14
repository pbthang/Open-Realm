import React, { useState, useEffect } from "react";
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
import parse from "html-react-parser";
import http from "../http-common";

const useStyles = makeStyles({
  root: {
    display: "block",
  },
  title: {
    width: "100%",
    marginTop: "1rem",
  },
  content: {
    width: "100%",
  },
  editorContainer: {
    width: "100%",
    marginTop: "1rem",
    marginBottom: "1rem",
    padding: "5px",
  },
  btn: {
    margin: "0 0.5rem",
  },
  typeChoose: {
    marginBottom: "1rem",
  },
});

function Create() {
  const classes = useStyles();

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

  const handleOnTypeChange = (e) => {
    setType(e.target.value);
    window.localStorage.setItem("type", e.target.value);
  };

  const handleOnContentChange = (e, editor) => {
    const data = editor.getData();
    setContent(data);
    window.localStorage.setItem("createCache", data);
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await http.get("/books");
      setPromptList(response.data);
    };
    fetchPrompts();
  }, []);

  return (
    <AppShell>
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
          <Typography>
            Create a new prompt for people to write about it
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              label="Title"
              variant="outlined"
              className={classes.title}
              value={title}
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
              wordWrap: "break-word",
            }}
          >
            {parse(content)}
          </Paper>
          <Button variant="contained" color="primary" className={classes.btn}>
            Publish
          </Button>
        </div>
      ) : (
        <div className={classes.root}>
          <Typography>Create a new writing for a prompt</Typography>
          <form noValidate autoComplete="off">
            <TextField
              label="Title"
              variant="outlined"
              className={classes.title}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                window.localStorage.setItem("titleCache", e.target.value);
              }}
            />
            <Autocomplete
              options={promptList}
              getOptionLabel={(option) => `${option.id} - ${option.title}`}
              id="disable-close-on-select"
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  multiline
                  rowsMax={3}
                  label="prompt"
                  margin="normal"
                />
              )}
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
              wordWrap: "break-word",
            }}
          >
            {parse(content)}
          </Paper>
          <Button variant="contained" color="primary" className={classes.btn}>
            Publish
          </Button>
        </div>
      )}
    </AppShell>
  );
}

export default Create;
