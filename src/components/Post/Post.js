import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Tooltip,
} from "@material-ui/core";
import Bookmark from "./Bookmark";
import { makeStyles } from "@material-ui/core/styles";
import UserDataService from "../../services/user.service";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "0.5rem",
    height: "9rem",
    width: "18rem",
    cursor: "default",
  },
  title: {
    fontWeight: 500,
  },
  number: {
    fontSize: "1rem",
  },
  action: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
    "&:visited": {
      textDecoration: "none",
      color: "inherit",
    },
    "&:hover": {
      textDecoration: "none",
      color: "inherit",
    },
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
      color: theme.palette.secondary.main,
    },
  },
  idAndDate: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function Post({ type, book }) {
  const classes = useStyles();
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthorInfo = async () => {
      const response = await UserDataService.get(book.author_id);
      setAuthor(response.data);
    };

    getAuthorInfo();
  }, [book.author_id]);

  if (type === "prompt") {
    return (
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <div className={classes.idAndDate}>
            <Typography variant="subtitle2">Id: #{book.id}</Typography>
            <Typography variant="caption">
              {moment(book.createdAt, "YYYY-MM-DD[T]hh:mm:ss")
                .utc(true)
                .fromNow()}
            </Typography>
          </div>
          <a href={`/home/${book.id}`} className={classes.link}>
            <Tooltip title={book.title} placement="top">
              <Typography noWrap className={classes.title}>
                {book?.title}
              </Typography>
            </Tooltip>
          </a>

          <Typography variant="subtitle1">
            By{" "}
            <a
              href={`/profile/${book.author_id}`}
              className={classes.authorName}
            >
              {author?.nickname}
            </a>
          </Typography>
        </CardContent>

        <CardActions className={classes.action}>
          <Bookmark type={type} book={book} />
          <Button size="small" component="a" href={`/home/${book.id}`}>
            Read
          </Button>
        </CardActions>
      </Card>
    );
  } else if (type === "writing") {
    return (
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <div className={classes.idAndDate}>
            <Typography variant="subtitle2">
              Id: #{book.id} - Prompt #{book.prompt_id}
            </Typography>
            <Typography variant="caption">
              {moment(book.createdAt, "YYYY-MM-DD[T]hh:mm:ss")
                .utc(true)
                .fromNow()}
            </Typography>
          </div>
          <a href={`/writings/${book.id}`} className={classes.link}>
            <Tooltip title={book.title} placement="top">
              <Typography noWrap className={classes.title}>
                {book.title}
              </Typography>
            </Tooltip>
          </a>

          <Typography variant="subtitle1">
            By{" "}
            <a
              href={`/profile/${book.author_id}`}
              className={classes.authorName}
            >
              {author.nickname}
            </a>
          </Typography>
        </CardContent>

        <CardActions className={classes.action}>
          <Bookmark type={type} book={book} />
          <Button size="small" component="a" href={`/writings/${book.id}`}>
            Read
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default Post;
