import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    margin: "1rem 1rem 1rem 2rem",
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
    wordWrap: "break-word",
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
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:visited": {
      color: "inherit",
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
    setContentLoading(true);
    try {
      const response = await WritingDataService.get(id);
      response.data && setBook(response.data);
      setContentLoading(false);
      return response.data;
    } catch (error) {
      enqueueSnackbar("Error loading writing", { variant: "error" });
      setContentLoading(false);
    }
  };

  useEffect(() => {
    const getBookAuthor = async (id) => {
      if (!id) return;
      setContentLoading(true);
      try {
        const response = await UserDataService.get(id);
        response.data && setBookAuthor(response.data);
      } catch (error) {
        enqueueSnackbar("Error loading writing", { variant: "error" });
      }
      setContentLoading(false);
    };

    const getPrompt = async (id) => {
      if (!id) return;
      setContentLoading(true);
      try {
        const response = await PromptDataService.get(id);
        response.data && setPrompt(response.data);
      } catch (error) {
        enqueueSnackbar("Error loading writing", { variant: "error" });
      }
      setContentLoading(false);
    };

    const getComments = async (postId) => {
      if (!postId) return;
      setCommentLoading(true);
      try {
        const response = await WritingCommentDataService.findByPost(postId);
        response.data && setComments(response.data.reverse());
      } catch (error) {
        enqueueSnackbar("Error loading comments", { variant: "error" });
      }
      setCommentLoading(false);
    };

    const getInfo = async () => {
      const book = await getBook(writingId);
      const bookAuthor = getBookAuthor(book?.author_id);
      const prompt = getPrompt(book?.prompt_id);
      Promise.all([bookAuthor, prompt]).then(() => setContentLoading(false));
      getComments(book?.id).then(() => setCommentLoading(false));
    };

    getInfo();
    // eslint-disable-next-line
  }, [writingId, enqueueSnackbar]);

  return (
    <AppShell>
      <div className={classes.root}>
        {contentLoading ? (
          <SectionLoading msg="Loading writing content..." />
        ) : (
          <>
            <div>
              <Link to={`/home/${book?.prompt_id}`} className={classes.link}>
                <Typography variant="body1" className={classes.previousPrompt}>
                  <ArrowBackIosIcon />
                  <b>
                    Prompt #{prompt?.id}: {prompt?.title}
                  </b>
                </Typography>
              </Link>
              <br /> <br />
              <Typography variant="body1" className={classes.writingId}>
                Id: #{book?.id}
              </Typography>
              <EditDeleteOptionBtn
                type="writing"
                book={book}
                reload={() => getBook(writingId)}
              />
            </div>
            <Typography variant="h2" className={classes.title}>
              {book?.title}
            </Typography>

            <span className={classes.authorInfo}>
              <Link
                to={`/profile/${bookAuthor?.user_id}`}
                className={classes.link}
              >
                <Avatar src={bookAuthor?.picture} className={classes.img} />
              </Link>
              <Link
                to={`/profile/${bookAuthor?.user_id}`}
                className={classes.link}
              >
                <Typography variant="h6" className={classes.authorName}>
                  {bookAuthor.nickname}
                </Typography>
              </Link>
            </span>
            <Typography
              variant="body1"
              className={classes.content}
              component="div"
            >
              {parse(book?.content ?? "")}
            </Typography>
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
