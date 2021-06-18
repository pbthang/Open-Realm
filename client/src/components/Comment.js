import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import UserDataService from "../services/user.service";
import promptCommentDataService from "../services/promptComment.service";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
  comments: {},
  comment: {
    margin: "1rem",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
  },
  img: {
    display: "inline",
    marginRight: "1rem",
  },
  usernameAndCmt: {
    display: "inline",
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
  optionBtn: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  danger: {
    color: theme.palette.error.main,
  },
}));

function Comment({ type, comment, deleteComment }) {
  const classes = useStyles();

  const { user } = useAuth0();

  const [cmtAuthor, setCmtAuthor] = useState({});
  // const [optionBtnRendered, setOptionBtnRendered] = useState(false);

  // For Option Btn
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOptionBtnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOptionBtnClose = () => {
    setAnchorEl(null);
  };
  const handleCommentDelete = async () => {
    setAnchorEl(null);
    await promptCommentDataService.delete(comment.id);
    deleteComment(comment.id);
  };

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
      {user.sub === comment.author_id && (
        <span className={classes.optionBtn}>
          <IconButton onClick={handleOptionBtnClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleOptionBtnClose}
          >
            <MenuItem onClick={handleOptionBtnClose}>Edit</MenuItem>
            <MenuItem onClick={handleCommentDelete} className={classes.danger}>
              Delete
            </MenuItem>
          </Menu>
        </span>
      )}
    </Paper>
  );
}

export default Comment;
