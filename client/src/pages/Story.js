import React, { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import EditDeleteOptionBtn from "../components/EditDeleteOptionBtn";
import Bookmark from "../components/Post/Bookmark";
import Post from "../components/Post";
import Comment from "../components/Comment";
import AddCommentForm from "../components/AddCommentForm";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { Avatar, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PromptDataService from "../services/prompt.service";
import UserDataService from "../services/user.service";
import PromptCommentDataService from "../services/promptComment.service";
import WritingDataService from "../services/writing.service";

const useStyle = makeStyles((theme) => ({
  root: {
    // margin: "1rem",
  },
  promptId: {
    display: "inline",
  },
  title: {
    display: "block",
    fontSize: "3rem",
    wordWrap: "normal",
  },
  content: {
    marginTop: "2rem",
    marginBottom: "2rem",
    wordWrap: "normal",
    "& a": {
      color: "inherit",
    },
    "& a:hover": {
      color: theme.palette.secondary.main,
    },
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
      color: theme.palette.secondary.main,
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
      color: theme.palette.secondary.main,
    },
  },
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

function Story() {
  const classes = useStyle();
  const { promptId } = useParams();

  const [book, setBook] = useState({});
  const [bookAuthor, setBookAuthor] = useState({});
  const [comments, setComments] = useState([]);
  const [nextWritings, setNextWritings] = useState([]);

  const addComment = (cmt) => {
    setComments((comments) => [cmt, ...comments]);
  };
  const deleteComment = (cmtId) => {
    setComments((comments) => comments.filter((cmt) => cmt.id !== cmtId));
  };

  const getBook = async (id) => {
    try {
      const response = await PromptDataService.get(id);
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
      const response = await PromptCommentDataService.findByPost(postId);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getNextWritings = async (promptId) => {
    try {
      const response = await WritingDataService.findByPromptId(promptId);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      const book = await getBook(promptId);
      setBook(book);

      const bookAuthor = await getBookAuthor(book.author_id);
      setBookAuthor(bookAuthor);

      const comments = await getComments(book.id);
      setComments(comments.reverse());
      const nextWritings = await getNextWritings(book.id);
      setNextWritings(nextWritings);
    };

    try {
      getInfo();
    } catch (error) {
      console.err(error);
    }
  }, [promptId]);

  return (
    <AppShell>
      <div className={classes.root}>
        <div>
          <Typography variant="body1" className={classes.promptId}>
            Id: #{book?.id}
          </Typography>
          <EditDeleteOptionBtn type="prompt" book={book} />
        </div>
        <Typography variant="h2" className={classes.title}>
          {book?.title}
        </Typography>

        <span className={classes.authorInfo}>
          <Avatar
            src={bookAuthor?.picture}
            className={classes.img}
            component="a"
            href={`/profile/${bookAuthor?.user_id}`}
          />
          <Typography
            variant="h6"
            className={classes.authorName}
            component="a"
            href={`/profile/${bookAuthor?.user_id}`}
          >
            {bookAuthor?.nickname}
          </Typography>
        </span>
        <div className={classes.content}>{parse(book?.content ?? "")}</div>
        <Bookmark type="prompt" book={book} />
        {nextWritings.length === 0 || (
          <>
            <Divider />
            <div className={classes.nextWritings}>
              <Typography variant="h3">Following Writings</Typography>
              <div>
                {nextWritings.map((writing) => (
                  <Post type="writing" book={writing} key={writing?.id} />
                ))}
              </div>
            </div>
          </>
        )}
        <Divider />
        <div className={classes.comments}>
          <AddCommentForm
            type="prompt"
            postId={book?.id}
            addComment={addComment}
          />
          {comments.map((cmt) => {
            console.log(cmt.id);
            return (
              <Comment
                type="prompt"
                comment={cmt}
                deleteComment={deleteComment}
                key={cmt.id}
              />
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

export default Story;
