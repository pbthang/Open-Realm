import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppShell from "../components/AppShell";
import Loading from "./Loading";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { Autocomplete } from "@material-ui/lab";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ckeditorConfig from "../config/ckeditorConfig";
import PromptDataService from "../services/prompt.service";
import WritingDataService from "../services/writing.service";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem 2rem",
  },
  createContainer: {
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
    transition: "all 0.3 ease",
    "& a": {
      color: "inherit",
    },
    "& a:hover": {
      color: theme.palette.secondary.main,
    },
  },
  btn: {
    margin: "0 1rem 1rem 1rem",
  },
  typeChoose: {
    marginTop: "1rem",
  },
  promptOption: {
    wordWrap: "break-word",
  },
}));

function Create() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { user } = useAuth0();

  const [content, setContent] = useState(
    window.localStorage.getItem("createCache") ?? ""
  );

  const [title, setTitle] = useState(
    window.localStorage.getItem("titleCache") ?? ""
  );

  const clearCache = () => {
    window.localStorage.removeItem("createCache");
    window.localStorage.removeItem("titleCache");
    window.localStorage.removeItem("promptCache");
    window.localStorage.removeItem("type");
  };

  // type can be PROMPT | WRITING
  const PROMPT = "prompt_type";
  const WRITING = "writing_type";
  const [type, setType] = useState(
    window.localStorage.getItem("type") ?? PROMPT
  );

  const [promptList, setPromptList] = useState([]);

  const [currentPrompt, setCurrentPrompt] = useState(
    JSON.parse(window.localStorage.getItem("promptCache")) ?? null
  );

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
      try {
        const response = await PromptDataService.getAll();
        setPromptList(response.data);
      } catch (error) {
        enqueueSnackbar("Error loading prompt list", { variant: "error" });
      }
    };

    fetchPrompts();
  }, [enqueueSnackbar]);

  const addPrompt = () => {
    if (title.length > 0 && content.length > 0) {
      setLoading(true);
      var data = {
        author_id: user.sub,
        title: title,
        content: content,
        published: true,
      };
      PromptDataService.create(data)
        .then(() => {
          clearCache();
          enqueueSnackbar("Create prompt successfully.", {
            variant: "success",
          });
          history.push("/home");
        })
        .catch((err) => {
          enqueueSnackbar("Error creating prompt.", { variant: "error" });
        });
      setLoading(false);
    } else {
      enqueueSnackbar("No field should be left empty", { variant: "warning" });
    }
  };

  const addWriting = () => {
    if (title.length > 0 && content.length > 0 && currentPrompt) {
      setLoading(true);
      const data = {
        title: title,
        author_id: user.sub,
        prompt_id: currentPrompt.id,
        content: content,
        published: true,
      };
      WritingDataService.create(data)
        .then(() => {
          clearCache();
          enqueueSnackbar("Create writing successfully.", {
            variant: "success",
          });
          history.push(`/home/${currentPrompt.id}`);
        })
        .catch((err) =>
          enqueueSnackbar("Error creating writing.", { variant: "error" })
        );
      setLoading(false);
    } else {
      enqueueSnackbar("No field should be left empty", { variant: "warning" });
    }
  };

  if (loading) return <Loading />;

  return (
    <AppShell>
      <div className={classes.root}>
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
          <div className={classes.createContainer}>
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
            {/* <Paper className={classes.preview}>{parse(content)}</Paper> */}
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
          <div className={classes.createContainer}>
            <FormControl fullWidth>
              <Autocomplete
                options={promptList}
                getOptionLabel={(option) => `${option.id} - ${option.title}`}
                getOptionSelected={(option, val) => option.id === val.id}
                openOnFocus
                forcePopupIcon
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

              <div className={classes.editorContainer}>
                <CKEditor
                  config={ckeditorConfig}
                  editor={ClassicEditor}
                  data={content}
                  onChange={handleOnContentChange}
                />
              </div>
            </form>
            {/* <Paper className={classes.preview}>{parse(content)}</Paper> */}
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
      </div>
    </AppShell>
  );
}

export default Create;
