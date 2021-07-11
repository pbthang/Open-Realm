import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { useAuth0 } from "@auth0/auth0-react";
import PromptCommentDataService from "../services/promptComment.service";
import WritingCommentDataService from "../services/writingComment.service";

const useStyles = makeStyles((theme) => ({
  addCmt: {
    margin: "1rem",
    position: "relative",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
    },
  },
  input: {
    wordWrap: "normal",
  },
  btn: {
    margin: "1rem 0 1rem 1rem",
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: 0,
    },
  },
}));

function AddCommentForm({ type, postId, addComment }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const { user } = useAuth0();

  const [newComment, setNewComment] = useState("");

  const addPromptComment = async () => {
    setLoading(true);
    try {
      if (newComment.length > 0) {
        const data = {
          post_id: postId,
          author_id: user.sub,
          content: newComment,
          published: true,
        };
        const response = await PromptCommentDataService.create(data);
        addComment(response.data);
        setNewComment("");
        enqueueSnackbar("Comment added successfully", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar("Error adding comment", { variant: "error" });
    }
    setLoading(false);
  };

  const addWritingComment = async () => {
    setLoading(true);
    try {
      if (newComment.length > 0) {
        const data = {
          post_id: postId,
          author_id: user.sub,
          content: newComment,
          published: true,
        };
        const response = await WritingCommentDataService.create(data);
        addComment(response.data);
        setNewComment("");
      }
    } catch (error) {
      enqueueSnackbar("Error adding comment", { variant: "error" });
    }
    setLoading(false);
  };

  const addNewComment =
    type === "prompt" ? addPromptComment : addWritingComment;

  return (
    <form className={classes.addCmt} noValidate autoComplete="off">
      <TextField
        label="Add comment"
        name="addComment"
        fullWidth
        multiline
        variant="outlined"
        className={classes.input}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && addNewComment()}
      />
      {loading ? (
        <CircularProgress color="inherit" size={30} className={classes.btn} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={addNewComment}
        >
          Add
        </Button>
      )}
    </form>
  );
}

export default AddCommentForm;
