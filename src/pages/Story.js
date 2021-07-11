import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell";
import EditDeleteOptionBtn from "../components/EditDeleteOptionBtn";
import Bookmark from "../components/Post/Bookmark";
import Post from "../components/Post";
import Comment from "../components/Comment";
import AddCommentForm from "../components/AddCommentForm";
import SectionLoading from "../components/SectionLoading";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { Avatar, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import PromptDataService from "../services/prompt.service";
import UserDataService from "../services/user.service";
import PromptCommentDataService from "../services/promptComment.service";
import WritingDataService from "../services/writing.service";

const useStyle = makeStyles((theme) => ({
  root: {
    margin: "1rem 1rem 1rem 2rem",
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
    wordWrap: "normal",
  },
  btn: {
    marginLeft: "1rem",
    height: "100%",
  },
  nextWritings: {
    margin: "1rem 0",
  },
  posts: {
    display: "flex",
    flexWrap: "wrap",
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

function Story() {
  const classes = useStyle();
  const { promptId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [contentLoading, setContentLoading] = useState(false);
  const [writingLoading, setWritingLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

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
    if (!id) return;
    setContentLoading(true);
    try {
      const response = await PromptDataService.get(id);
      response.data && setBook(response.data);
      setContentLoading(false);
      return response.data;
    } catch (error) {
      enqueueSnackbar("Error loading prompt", { variant: "error" });
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
        enqueueSnackbar("Error loading prompt", { variant: "error" });
      }
      setContentLoading(false);
    };

    const getComments = async (postId) => {
      if (!postId) return;
      setCommentLoading(true);
      try {
        const response = await PromptCommentDataService.findByPost(postId);
        response.data && setComments(response.data.reverse());
      } catch (error) {
        enqueueSnackbar("Error loading comments", { variant: "error" });
      }
      setCommentLoading(false);
    };

    const getNextWritings = async (promptId) => {
      if (!promptId) return;
      setWritingLoading(true);
      try {
        const response = await WritingDataService.findByPromptId(promptId);
        response.data && setNextWritings(response.data);
      } catch (error) {
        enqueueSnackbar("Error loading following writings", {
          variant: "error",
        });
      }
      setWritingLoading(false);
    };
    const getInfo = async () => {
      const book = await getBook(promptId);
      getBookAuthor(book?.author_id);
      getComments(book?.id);
      getNextWritings(book?.id);
    };

    getInfo();
    // eslint-disable-next-line
  }, [promptId, enqueueSnackbar]);

  return (
    <AppShell>
      <div className={classes.root}>
        {contentLoading ? (
          <SectionLoading msg="Loading prompt content..." />
        ) : (
          <>
            <div>
              <Typography variant="body1" className={classes.promptId}>
                Id: #{promptId}
              </Typography>
              <EditDeleteOptionBtn
                type="prompt"
                book={book}
                reload={() => getBook(promptId)}
              />
            </div>
            <Typography variant="h2" className={classes.title}>
              {book?.title}
            </Typography>

            <span className={classes.authorInfo}>
              <Link to={`/profile/${bookAuthor?.user_id}`}>
                <Avatar src={bookAuthor?.picture} className={classes.img} />
              </Link>

              <Link
                to={`/profile/${bookAuthor?.user_id}`}
                className={classes.link}
              >
                <Typography variant="h6" className={classes.authorName}>
                  {bookAuthor?.nickname}
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
            <Bookmark type="prompt" book={book} />
          </>
        )}

        {writingLoading ? (
          <>
            <Divider />
            <SectionLoading msg="Loading following writings..." />
          </>
        ) : (
          nextWritings.length === 0 || (
            <>
              <Divider />
              <div className={classes.nextWritings}>
                <Typography variant="h3">Following Writings</Typography>
                <div className={classes.posts}>
                  {nextWritings.map((writing) => (
                    <Post type="writing" book={writing} key={writing?.id} />
                  ))}
                </div>
              </div>
            </>
          )
        )}

        <Divider />
        <div className={classes.comments}>
          <AddCommentForm
            type="prompt"
            postId={book?.id}
            addComment={addComment}
          />
          {commentLoading ? (
            <SectionLoading msg="Loading comments..." />
          ) : (
            comments.map((cmt) => {
              return (
                <Comment
                  type="prompt"
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

export default Story;
