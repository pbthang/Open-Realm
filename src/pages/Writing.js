import React, { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import Bookmark from "../components/Post/Bookmark";
import Comment from "../components/Comment";
import AddCommentForm from "../components/AddCommentForm";
import EditDeleteOptionBtn from "../components/EditDeleteOptionBtn";
import SectionLoading from "../components/SectionLoading";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { Avatar, Divider, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import UserDataService from "../services/user.service";
import WritingCommentDataService from "../services/writingComment.service";
import WritingDataService from "../services/writing.service";
import PromptDataService from "../services/prompt.service";

const useStyle = makeStyles((theme) => ({
  root: {
    margin: "1rem",
  },
  writingId: {
    // display: "inline",
  },
  previousPrompt: {
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
    display: "flex",
    alignItems: "center",
  },
  title: {
    display: "inline-block",
    fontSize: "3rem",
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
  const { enqueueSnackbar } = useSnackbar();
  const [contentLoading, setContentLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  const [book, setBook] = useState({});
  const [bookAuthor, setBookAuthor] = useState({});
  const [comments, setComments] = useState([]);
  const [prompt, setPrompt] = useState({});

  const addComment = (cmt) => {
    setComments((comments) => [cmt, ...comments]);
  };
  const deleteComment = (cmtId) => {
    setComments((comments) => comments.filter((cmt) => cmt.id !== cmtId));
  };

  const getBook = async (id) => {
    if (!id) return;
    try {
      const response = await WritingDataService.get(id);
      response.data && setBook(response.data);
      return response.data;
    } catch (error) {
      enqueueSnackbar("Error loading writing", { variant: "error" });
    }
  };

  const getBookAuthor = async (id) => {
    if (!id) return;
    try {
      const response = await UserDataService.get(id);
      response.data && setBookAuthor(response.data);
      return response.data;
    } catch (error) {
      enqueueSnackbar("Error loading writing", { variant: "error" });
    }
  };

  const getPrompt = async (id) => {
    if (!id) return;
    try {
      const response = await PromptDataService.get(id);
      response.data && setPrompt(response.data);
      return response.data;
    } catch (error) {
      enqueueSnackbar("Error loading writing", { variant: "error" });
    }
  };

  const getComments = async (postId) => {
    if (!postId) return;
    try {
      const response = await WritingCommentDataService.findByPost(postId);
      response.data && setComments(response.data.reverse());
      return response.data;
    } catch (error) {
      enqueueSnackbar("Error loading comments", { variant: "error" });
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      setContentLoading(true);
      setCommentLoading(true);
      const book = await getBook(writingId);
      const bookAuthor = getBookAuthor(book?.author_id);
      const prompt = getPrompt(book?.prompt_id);
      Promise.all([bookAuthor, prompt]).then(() => setContentLoading(false));
      getComments(book?.id).then(() => setCommentLoading(false));
    };

    getInfo();
  }, [writingId]);

  return (
    <AppShell>
      <div className={classes.root}>
        {contentLoading ? (
          <SectionLoading msg="Loading writing content..." />
        ) : (
          <>
            <div>
              <Typography
                variant="body1"
                className={classes.previousPrompt}
                component="a"
                href={`/home/${book?.prompt_id}`}
              >
                <ArrowBackIosIcon />
                <b>
                  Prompt #{prompt?.id}: {prompt?.title}
                </b>
              </Typography>
              <br /> <br />
              <Typography variant="body1" className={classes.writingId}>
                Id: #{book?.id}
              </Typography>
              <EditDeleteOptionBtn type="writing" book={book} />
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
                {bookAuthor.nickname}
              </Typography>
            </span>
            <div className={classes.content}>{parse(book?.content ?? "")}</div>
            <Bookmark type="writing" book={book} />
          </>
        )}

        <Divider />
        <div className={classes.comments}>
          <AddCommentForm
            type="writing"
            postId={book?.id}
            addComment={addComment}
          />
          {commentLoading ? (
            <SectionLoading msg="Loading comments..." />
          ) : (
            comments.map((cmt, idx) => {
              return (
                <Comment
                  type="writing"
                  comment={cmt}
                  deleteComment={deleteComment}
                  key={cmt.id}
                />
              );
            })
          )}
        </div>
      </div>
    </AppShell>
  );
}

export default Writing;
