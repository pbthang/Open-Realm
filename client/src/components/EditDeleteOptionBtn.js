import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ckeditorConfig from "../config/ckeditorConfig";
import { useAuth0 } from "@auth0/auth0-react";
import PromptDataService from "../services/prompt.service";
import WritingDataService from "../services/writing.service";

const useStyles = makeStyles((theme) => ({
  optionBtn: {
    float: "right",
  },
  danger: {
    color: theme.palette.error.main,
  },
  cancelBtn: {
    color: theme.palette.error.main,
  },
  submitBtn: {},
  iconBtn: {
    opacity: 0.3,
    "&:hover": {
      opacity: 1,
    },
  },
  titleInput: {
    marginBottom: "2rem",
  },
  editorContainer: {
    color: "#000",
    width: "100%",
  },
}));

function EditDeleteOptionBtn({ type, book }) {
  const classes = useStyles();
  const { user } = useAuth0();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Set default values
  useEffect(() => {
    setTitle(book.title);
    setContent(book.content);
  }, [book.title, book.content]);

  // For Option Btn
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOptionBtnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOptionBtnClose = () => {
    setAnchorEl(null);
  };

  // For Delete Option
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleOpenDeleteDialog = () => {
    handleOptionBtnClose();
    setDeleteDialogOpen(true);
  };
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  const handlePromptDelete = async () => {
    try {
      await PromptDataService.delete(book.id);
      history.push("/home");
    } catch (error) {
      console.error(error);
    }
  };
  const handleWritingDelete = async () => {
    try {
      await WritingDataService.delete(book.id);
      history.push(`/home/${book.prompt_id}`);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = () => {
    if (type === "prompt") {
      handlePromptDelete();
    } else if (type === "writing") {
      handleWritingDelete();
    }
  };

  // For Edit Option
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const handleClickEditDialogOpen = () => {
    handleOptionBtnClose();
    setEditDialogOpen(true);
  };
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };
  const handlePromptEditSubmit = async () => {
    await PromptDataService.update(book.id, { title, content });
    history.push(`/home/${book.id}`);
    handleEditDialogClose();
  };
  const handleWritingEditSubmit = async () => {
    await WritingDataService.update(book.id, { title, content });
    history.push(`/writings/${book.id}`);
    handleEditDialogClose();
  };
  const handleEditSubmit = () => {
    if (type === "prompt") {
      handlePromptEditSubmit();
    } else if (type === "writing") {
      handleWritingEditSubmit();
    }
  };

  return (
    <div>
      {user.sub === book.author_id && (
        <span className={classes.optionBtn}>
          <IconButton
            onClick={handleOptionBtnClick}
            className={classes.iconBtn}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleOptionBtnClose}
          >
            <MenuItem onClick={handleClickEditDialogOpen}>Edit</MenuItem>
            <MenuItem
              onClick={handleOpenDeleteDialog}
              className={classes.danger}
            >
              Delete
            </MenuItem>
          </Menu>
        </span>
      )}
      <Dialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        maxWidth="md"
        className={classes.editDialog}
      >
        <DialogTitle>
          Edit {type === "prompt" ? "Prompt" : "Writing"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Edit your works here</DialogContentText>
          <TextField
            className={classes.titleInput}
            autoFocus
            margin="dense"
            fullWidth
            multiline
            label="Title"
            defaultValue={book.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={classes.editorContainer}>
            <CKEditor
              editor={ClassicEditor}
              config={ckeditorConfig}
              data={content}
              defaultValue={book.content}
              onChange={(e, editor) => {
                console.log(editor.getData());
                setContent(editor.getData());
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditDialogClose}
            variant="text"
            className={classes.cancelBtn}
          >
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} variant="text" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        maxWidth="sm"
        className={classes.editDialog}
      >
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this{" "}
            {type === "prompt" ? "prompt" : "writing"}?
            <br /> This is non-reversible
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} variant="text">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="text"
            color="primary"
            className={classes.cancelBtn}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditDeleteOptionBtn;
