import React, { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import Bookmark from "../components/Post/Bookmark";
import Post from "../components/Post";
import Comment from "../components/Comment";
import AddCommentForm from "../components/AddCommentForm";
import parse from "html-react-parser";
import { useParams, useHistory } from "react-router-dom";
import {
  Avatar,
  Divider,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";
import UserDataService from "../services/user.service";
import WritingCommentDataService from "../services/writingComment.service";
import WritingDataService from "../services/writing.service";

const useStyle = makeStyles((theme) => ({
  root: {
    margin: "1rem",
  },
  writingId: {
    display: "inline",
  },
  title: {
    display: "inline-block",
    fontSize: "3rem",
  },
  content: {
    marginTop: "2rem",
    marginBottom: "2rem",
    wordWrap: "normal",
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
  nextWritings: {
    margin: "1rem 0",
  },
  optionBtn: {
    float: "right",
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
}));

function Writing() {
  const classes = useStyle();
  const { writingId } = useParams();
  const { user } = useAuth0();
  const history = useHistory();

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

  const addComment = (cmt) => {
    setComments((comments) => [cmt, ...comments]);
  };
  const deleteComment = (cmtId) => {
    setComments((comments) => comments.filter((cmt) => cmt.id !== cmtId));
  };

  const handleWritingDelete = async () => {
    try {
      await WritingDataService.delete(writingId);
      history.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const getBook = async (id) => {
    try {
      const response = await WritingDataService.get(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getBookAuthor = async (id) => {
    try {
      const response = await UserDataService.get(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getComments = async (postId) => {
    try {
      const response = await WritingCommentDataService.findByPost(postId);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      const book = await getBook(writingId);
      setBook(book);

      const bookAuthor = await getBookAuthor(book.author_id);
      setBookAuthor(bookAuthor);

      const comments = await getComments(book.id);
      setComments(comments.reverse());
    };

    try {
      getInfo();
    } catch (error) {
      console.err(error);
    }
  }, [writingId]);

  return (
    <AppShell>
      <div className={classes.root}>
        <div>
          <Typography variant="h6" className={classes.writingId}>
            Id: {book.id}
          </Typography>
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
                <MenuItem onClick={handleOptionBtnClose}>Edit</MenuItem>
                <MenuItem
                  onClick={handleWritingDelete}
                  className={classes.danger}
                >
                  Delete
                </MenuItem>
              </Menu>
            </span>
          )}
        </div>
        <Typography variant="h2" className={classes.title}>
          {book.title}
        </Typography>

        <span className={classes.authorInfo}>
          <Avatar
            src={bookAuthor.picture}
            className={classes.img}
            component="a"
            href={`/profile/${bookAuthor.user_id}`}
          />
          <Typography
            variant="h6"
            className={classes.authorName}
            component="a"
            href={`/profile/${bookAuthor.user_id}`}
          >
            {bookAuthor.nickname}
          </Typography>
        </span>
        <div className={classes.content}>{parse(book.content ?? "")}</div>
        <Bookmark type="writing" book={book} />
        <Divider />
        <div className={classes.comments}>
          <AddCommentForm
            type="prompt"
            postId={book.id}
            addComment={addComment}
          />
          {comments.map((cmt, idx) => {
            return (
              <Comment
                type="writing"
                comment={cmt}
                deleteComment={deleteComment}
                key={idx}
              />
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

export default Writing;