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
  CircularProgress,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
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
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth0();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Set default values
  useEffect(() => {
    book?.title && setTitle(book.title);
    book?.content && setContent(book.content);
  }, [book?.title, book?.content]);

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
    setLoading(true);
    try {
      await PromptDataService.delete(book.id);
      enqueueSnackbar("Delete prompt successfully", { variant: "success" });
      setLoading(false);
      history.push("/home");
    } catch (error) {
      enqueueSnackbar("Error deleting prompt", { variant: "error" });
      setLoading(false);
    }
  };
  const handleWritingDelete = async () => {
    setLoading(true);
    try {
      await WritingDataService.delete(book.id);
      enqueueSnackbar("Delete writing successfully", { variant: "success" });
      setLoading(false);
      history.push(`/home/${book.prompt_id}`);
    } catch (error) {
      enqueueSnackbar("Error deleting writing", { variant: "error" });
      setLoading(false);
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
    setLoading(true);
    try {
      await PromptDataService.update(book.id, { title, content });
      enqueueSnackbar("Update prompt successfully", { variant: "success" });
      window.location.href = window.location.href;
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("Error updating prompt", { variant: "error" });
      setLoading(false);
    }
    handleEditDialogClose();
  };
  const handleWritingEditSubmit = async () => {
    setLoading(true);
    try {
      await WritingDataService.update(book.id, { title, content });
      enqueueSnackbar("Update writing successfully", { variant: "success" });
      window.location.href = window.location.href;
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("Error updating prompt", { variant: "error" });
      setLoading(false);
    }
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
        fullWidth
        className={classes.editDialog}
      >
        <DialogTitle>
          Edit {type === "prompt" ? "Prompt" : "Writing"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Edit your works here</DialogContentText>
          <TextField
            className={classes.titleInput}
            error={title.length > 255}
            helperText={
              title.length > 255
                ? "Title should have less than 255 characters"
                : ""
            }
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
        {loading ? (
          <DialogActions>
            <CircularProgress size={30} color="inherit" />
          </DialogActions>
        ) : (
          <DialogActions>
            <Button
              onClick={handleEditDialogClose}
              variant="text"
              className={classes.cancelBtn}
            >
              Cancel
            </Button>
            <Button onClick={handleEditSubmit} variant="text">
              Submit
            </Button>
          </DialogActions>
        )}
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        maxWidth="sm"
        className={classes.editDialog}
      >
        <DialogTitle>
          Delete {type === "prompt" ? "Prompt" : "Writing"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this{" "}
            {type === "prompt" ? "prompt" : "writing"}?
            <br /> This is non-reversible
          </DialogContentText>
        </DialogContent>
        {loading ? (
          <DialogActions>
            <CircularProgress size={30} color="inherit" />
          </DialogActions>
        ) : (
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
        )}
      </Dialog>
    </div>
  );
}

export default EditDeleteOptionBtn;
