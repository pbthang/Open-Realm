import React, { useState, useEffect } from "react";
import { Paper, Typography, Avatar } from "@material-ui/core";
import UserDataService from "../services/user.service";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
}));

function Comment({ comment }) {
  const classes = useStyles();

  const [cmtAuthor, setCmtAuthor] = useState({});

  useEffect(() => {
    const getCommentAuthorInfo = async () => {
      const response = await UserDataService.get(comment.author_id);
      setCmtAuthor(response.data);
    };

    getCommentAuthorInfo();
  }, [comment.author_id]);

  return (
    <Paper className={classes.comment}>
      <Avatar
        src={cmtAuthor?.picture}
        className={classes.img}
        component="a"
        href={`/profile/${cmtAuthor?.user_id}`}
      />
      <span className={classes.usernameAndCmt}>
        <Typography
          variant="body2"
          className={classes.username}
          component="a"
          href={`/profile/${cmtAuthor?.user_id}`}
        >
          {cmtAuthor?.nickname}
        </Typography>
        <Typography variant="body1" className={classes.cmtText}>
          {comment?.content}
        </Typography>
      </span>
    </Paper>
  );
}

export default Comment;
