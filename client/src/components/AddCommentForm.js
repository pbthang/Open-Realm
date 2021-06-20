import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";
import PromptCommentDataService from "../services/promptComment.service";
import WritingCommentDataService from "../services/writingComment.service";

const useStyles = makeStyles((theme) => ({
  addCmt: {
    margin: "1rem",
    display: "flex",
    alignItems: "center",
  },
  input: {
    wordWrap: "normal",
  },
  btn: {
    marginLeft: "1rem",
    height: "100%",
  },
}));

function AddCommentForm({ type, postId, addComment }) {
  const classes = useStyles();

  const { user } = useAuth0();

  const [newComment, setNewComment] = useState("");

  const addPromptComment = async () => {
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addWritingComment = async () => {
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
      console.error(error);
    }
  };

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
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.btn}
        onClick={type === "prompt" ? addPromptComment : addWritingComment}
      >
        Add
      </Button>
    </form>
  );
}

export default AddCommentForm;
