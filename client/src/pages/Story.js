import React, { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import Bookmark from "../components/Post/Bookmark";
import Post from "../components/Post";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Divider,
  Paper,
  Typography,
  TextField,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import api from "../api/api";
import PromptDataService from "../services/prompt.service";
import UserDataService from "../services/user.service";

const useStyle = makeStyles((theme) => ({
  root: {
    margin: "1rem",
  },
  title: {
    display: "inline-block",
    fontSize: "3rem",
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
  authorName: {
    textDecoration: "none",
    color: "inherit",
    transition: "color 0.2s ease",
    "&:visited": {
      textDecoration: "none",
      color: "inherit",
    },
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
  },
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
  usernameAndCmt: {
    display: "inline-block",
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
      color: theme.palette.primary.main,
    },
  },
  addCmt: {
    margin: "1rem",
    display: "flex",
    alignItems: "center",
  },
  input: {
    wordWrap: "break-word",
  },
  btn: {
    marginLeft: "1rem",
    height: "100%",
  },
  nextChapters: {
    margin: "1rem 0",
  },
  optionBtn: {
    float: "right",
  },
  danger: {
    color: theme.palette.error.main,
  },
}));

function Story() {
  const classes = useStyle();
  const { bookId } = useParams();

  // For Option Btn
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOptionBtnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOptionBtnClose = () => {
    setAnchorEl(null);
  };

  const [book, setBook] = useState({});
  const [bookAuthor, setBookAuthor] = useState({});
  const [comments, setComments] = useState([]);
  const [commentAuthors, setCommentAuthors] = useState([]);
  const [nextChapters, setNextChapters] = useState([]);

  const [newComment, setNewComment] = useState("");

  const addComment = (e) => {
    setNewComment("");
  };

  const getBook = async (id) => {
    const response = await PromptDataService.get(id);
    return response.data;
  };

  const getBookAuthor = async (id) => {
    const response = await UserDataService.get(id);
    return response.data;
  };

  const getComments = async (ids = []) => {
    const queryString = ids.map((id) => `id=${id}`).join("&");
    if (queryString?.length) {
      const response = await api.get("/comments?" + queryString);
      return response.data;
    } else {
      return [];
    }
  };

  const getCommentAuthors = async (cmts = []) => {
    const queryString = cmts.map((cmt) => `id=${cmt.author}`).join("&");
    if (queryString?.length) {
      const response = await api.get("/users?" + queryString);
      return response.data;
    } else {
      return [];
    }
  };

  const getNextChapters = async (ids = []) => {
    const queryString = ids.map((id) => `id=${id}`).join("&");
    if (queryString?.length) {
      const response = await api.get("/chapters?" + queryString);
      return response.data;
    } else {
      return [];
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      const book = await getBook(bookId);
      setBook(book);
      console.log(book);
      const bookAuthor = await getBookAuthor(book.author_id);
      setBookAuthor(bookAuthor);
      const comments = await getComments(book.comments);
      setComments(comments);
      const commentAuthors = await getCommentAuthors(comments);
      setCommentAuthors(commentAuthors);
      const nextChapters = await getNextChapters(book.nextChapters);
      setNextChapters(nextChapters);
    };

    getInfo();
  }, [bookId]);

  return (
    <AppShell>
      <div className={classes.root}>
        <Typography variant="h6">
          Id: {book.id}
          <span className={classes.optionBtn}>
            <IconButton onClick={handleOptionBtnClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleOptionBtnClose}
            >
              <MenuItem onClick={handleOptionBtnClose}>Edit</MenuItem>
              <MenuItem
                onClick={handleOptionBtnClose}
                className={classes.danger}
              >
                Delete
              </MenuItem>
            </Menu>
          </span>
        </Typography>
        <Typography variant="h2" className={classes.title}>
          {book.title}
          {/* - Chapter {book.chapter} */}
        </Typography>

        <span className={classes.authorInfo}>
          <Avatar
            src={bookAuthor.picture}
            className={classes.img}
            component="a"
            href={`/profile/${bookAuthor.sub}`}
          />
          <Typography
            variant="h6"
            className={classes.authorName}
            component="a"
            href={`/profile/${bookAuthor.sub}`}
          >
            {bookAuthor.nickname}
          </Typography>
        </span>
        <Typography variant="body1" className={classes.content}>
          {parse(book.content)}
        </Typography>
        <Bookmark type="book" book={book} />
        {nextChapters.length === 0 || (
          <>
            <Divider />
            <div className={classes.nextChapters}>
              <Typography variant="h3">Next chapters</Typography>
              <div>
                {nextChapters.map((chapter, idx) => (
                  <Post
                    type="chapter"
                    book={chapter}
                    author={chapter.author}
                    key={idx}
                  />
                ))}
              </div>
            </div>
          </>
        )}
        <Divider />
        <div className={classes.comments}>
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
              onClick={addComment}
            >
              Add
            </Button>
          </form>
          {comments.map((cmt, idx) => {
            const cmtAuthor = commentAuthors.find((x) => x.id === cmt.author);
            return (
              <Paper className={classes.comment} key={idx}>
                <Avatar
                  src={cmtAuthor?.picture}
                  className={classes.img}
                  component="a"
                  href={`/profile/${cmtAuthor?.id}`}
                />
                <span className={classes.usernameAndCmt}>
                  <Typography
                    variant="body2"
                    className={classes.username}
                    component="a"
                    href={`/profile/${cmtAuthor?.id}`}
                  >
                    {cmtAuthor?.id}
                  </Typography>
                  <Typography variant="body1" className={classes.cmtText}>
                    {cmt.content}
                  </Typography>
                </span>
              </Paper>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

export default Story;
