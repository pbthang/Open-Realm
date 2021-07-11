import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  CircularProgress,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import UserDataService from "../services/user.service";
import PromptCommentDataService from "../services/promptComment.service";
import WritingCommentDataService from "../services/writingComment.service";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  comments: {},
  comment: {
    margin: "1rem",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
  },
  img: {
    display: "inline",
    marginRight: "1rem",
  },
  usernameAndCmt: {
    display: "inline",
  },
  username: {
    textDecoration: "none",
    fontWeight: 700,
    color: "inherit",
    transition: "color 0.2s ease",
    "&:visited": {
      textDecoration: "none",
      fontWeight: 700,
      color: "inherit",
    },
    "&:hover": {
      textDecoration: "none",
      fontWeight: 700,
      color: theme.palette.secondary.main,
    },
  },
  optionBtn: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  danger: {
    color: theme.palette.error.main,
  },
  iconBtn: {
    opacity: 0.3,
    "&:hover": {
      opacity: 1,
    },
  },
  editCmt: {
    margin: "1rem",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginRight: "1rem",
  },
  submitBtn: {
    marginRight: "1rem",
  },
  cancelBtn: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
  date: {},
}));

function Comment({ type, comment, deleteComment }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const { user } = useAuth0();

  const [commentContent, setCommentContent] = useState(comment?.content);
  const [cmtAuthor, setCmtAuthor] = useState({});

  // For Option Btn
  const [anchorEl, setAnchorEl] = React.useState(null);
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
    handleCancelClick();
    setDeleteDialogOpen(true);
  };
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  const handleCommentDelete = async () => {
    setLoading(true);
    try {
      if (type === "prompt") {
        await PromptCommentDataService.delete(comment.id);
      } else if (type === "writing") {
        await WritingCommentDataService.delete(comment.id);
      }
      deleteComment(comment.id);
      handleCloseDeleteDialog();
      enqueueSnackbar("Delete comment successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error deleting comment", { variant: "error" });
    }
    setLoading(false);
  };

  // For Edit Option
  const [newCommentContent, setNewCommentContent] = useState("");
  const [editFormRendered, setEditFormRendered] = useState(false);
  const handleEditClick = () => {
    handleOptionBtnClose();
    setNewCommentContent(comment.content);
    setEditFormRendered(true);
  };
  const handleCancelClick = () => {
    setEditFormRendered(false);
    setNewCommentContent("");
  };
  const handleEditSubmit = async () => {
    setLoading(true);
    try {
      await updateComment(newCommentContent);
      setCommentContent(newCommentContent);
      handleCancelClick();
      enqueueSnackbar("Update comment successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error updating comment", { variant: "error" });
    }
    setLoading(false);
  };
  const updateComment = async (newCmt) => {
    if (type === "prompt") {
      await PromptCommentDataService.update(comment.id, { content: newCmt });
    } else if (type === "writing") {
      await WritingCommentDataService.update(comment.id, { content: newCmt });
    }
  };

  useEffect(() => {
    const getCommentAuthorInfo = async () => {
      const response = await UserDataService.get(comment.author_id);
      setCmtAuthor(response.data);
    };

    getCommentAuthorInfo();
  }, [comment.author_id]);

  return (
    <>
      <Tooltip
        title={
          !!comment?.createdAt &&
          moment(comment.createdAt, "YYYY-MM-DD[T]hh:mm:ss").utc(true).fromNow()
        }
        placement="top-start"
      >
        <Paper className={classes.comment}>
          <Link to={`/profile/${cmtAuthor?.user_id}`} className={classes.img}>
            <Avatar src={cmtAuthor?.picture} />
          </Link>
          <span className={classes.usernameAndCmt}>
            <Typography variant="body2">
              <Link
                to={`/profile/${cmtAuthor?.user_id}`}
                className={classes.username}
              >
                {cmtAuthor?.nickname}
              </Link>
            </Typography>

            <Typography variant="body1" className={classes.cmtText}>
              {commentContent}
            </Typography>
          </span>
          {user.sub === comment?.author_id && (
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
                <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                <MenuItem
                  onClick={handleOpenDeleteDialog}
                  className={classes.danger}
                >
                  Delete
                </MenuItem>
              </Menu>
            </span>
          )}
        </Paper>
      </Tooltip>
      {editFormRendered && (
        <form className={classes.editCmt} noValidate autoComplete="off">
          <TextField
            label="Edit comment"
            name="editComment"
            fullWidth
            multiline
            variant="outlined"
            className={classes.input}
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
          />
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                className={classes.submitBtn}
                onClick={handleEditSubmit}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                color="error"
                className={classes.cancelBtn}
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            </>
          )}
        </form>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        maxWidth="sm"
        className={classes.editDialog}
      >
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this comment?
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
              onClick={handleCommentDelete}
              variant="text"
              className={classes.cancelBtn}
            >
              Delete
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}

export default Comment;
