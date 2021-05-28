import React, { useState, useEffect } from "react";
import AppShell from "../components/AppShell";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Paper } from "@material-ui/core";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";

const useStyles = makeStyles({
  root: {
    display: "block",
  },
  title: {
    width: "100%",
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
  },
  btn: {
    margin: "0 0.5rem",
  },
});

function Create() {
  const classes = useStyles();

  const [content, setContent] = useState(
    window.sessionStorage.getItem("createCache") ?? ""
  );

  const [title, setTitle] = useState(
    window.sessionStorage.getItem("titleCache") ?? ""
  );

  const handleOnChange = (e, editor) => {
    const data = editor.getData();
    setContent(data);
    window.sessionStorage.setItem("createCache", data);
  };

  return (
    <AppShell>
      <div className={classes.root}>
        <form noValidate autoComplete="off" name="newBook">
          <TextField
            label="Title"
            variant="outlined"
            className={classes.title}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              window.sessionStorage.setItem("titleCache", e.target.value);
            }}
          />
          <Paper className={classes.editorContainer}>
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={handleOnChange}
            />
          </Paper>
        </form>
        <Paper style={{ padding: "1rem", margin: "1rem 0" }}>
          {parse(content)}
        </Paper>
        <Button variant="contained" color="primary" className={classes.btn}>
          Save Draft
        </Button>
        <Button variant="contained" color="primary" className={classes.btn}>
          Create
        </Button>
      </div>
    </AppShell>
  );
}

export default Create;