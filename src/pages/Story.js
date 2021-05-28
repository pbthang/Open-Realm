import React from "react";
import AppShell from "../components/AppShell";
import Bookmark from "../components/Post/Bookmark";
import { books } from "../components/Post/testDb";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Divider,
  Paper,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {
    margin: "1rem",
  },
  title: {
    display: "inline-block",
  },
  content: {
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  authorInfo: {
    display: "flex",
    alignItems: "center",
    margin: "1rem 0",
  },
  authorName: {},
  comments: {},
  comment: {
    margin: "1rem",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
  },
  img: {
    display: "inline-block",
    marginRight: "1rem",
  },
  usernameandcmt: {
    display: "inline-block",
  },
  username: {
    textDecoration: "underlined",
  },
  addCmt: {
    margin: "1rem",
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "90%",
  },
  btn: {
    marginLeft: "1rem",
    height: "100%",
  },
});

function Story() {
  const classes = useStyle();
  const { bookId } = useParams();

  const book = books.find((b) => b.id === parseInt(bookId));
  const comments = book.comments;

  return (
    <AppShell>
      <div className={classes.root}>
        <Typography variant="h2" className={classes.title}>
          {book.chapter}. {book.title}
        </Typography>

        <span className={classes.authorInfo}>
          <Avatar src={book.author.picture} className={classes.img} />
          <Typography variant="h6" className={classes.authorName}>
            {book.author.name}
          </Typography>
        </span>
        <Typography variant="body1" className={classes.content}>
          {book.content}
        </Typography>
        <Bookmark book={book} />
        <Divider />
        <div className={classes.comments}>
          <form className={classes.addCmt} noValidate autoComplete="off">
            <TextField
              label="Add comment"
              variant="outlined"
              className={classes.input}
            />
            <Button variant="contained" color="primary" className={classes.btn}>
              Add
            </Button>
          </form>
          {comments.map((cmt) => (
            <Paper className={classes.comment}>
              <Avatar src={cmt.author.picture} className={classes.img} />
              <span className={classes.usernameandcmt}>
                <Typography variant="body2" className={classes.username}>
                  <strong>{cmt.author.name}</strong>
                </Typography>
                <Typography variant="body1" className={classes.cmtText}>
                  {cmt.comment}
                </Typography>
              </span>
            </Paper>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

export default Story;
