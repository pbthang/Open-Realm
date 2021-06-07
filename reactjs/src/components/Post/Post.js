import React from "react";
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "0.5rem",
    height: "10rem",
    width: "19rem",
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
      color: theme.palette.primary.main,
    },
  },
}));

function Post({ type, book }) {
  const classes = useStyles();

  if (type === "book") {
    return (
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1">Id: {book.id}</Typography>
          <a href={`/home/${book.id}`} className={classes.link}>
            <Tooltip title={book.title} placement="top">
              <Typography noWrap className={classes.title}>
                {book.title}
              </Typography>
            </Tooltip>
          </a>

          <Typography variant="subtitle1">
            By{" "}
            <a href={`/profile/${book.author}`} className={classes.authorName}>
              {book.author}
            </a>
          </Typography>
        </CardContent>

        <CardActions className={classes.action}>
          <Bookmark book={book} />
          <Button size="small" component="a" href={`/home/${book.id}`}>
            Read
          </Button>
        </CardActions>
      </Card>
    );
  } else if (type === "chapter") {
    return (
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1">
            Id: {book.id} - Chapter {book.chapter}
          </Typography>
          <a href={`/chapter/${book.id}`} className={classes.link}>
            <Tooltip title={book.title} placement="top">
              <Typography noWrap className={classes.title}>
                {book.title}
              </Typography>
            </Tooltip>
          </a>

          <Typography variant="subtitle1">
            By{" "}
            <a href={`/profile/${book.author}`} className={classes.authorName}>
              {book.author}
            </a>
          </Typography>
        </CardContent>

        <CardActions className={classes.action}>
          <Bookmark book={book} />
          <Button size="small" component="a" href={`/chapter/${book.id}`}>
            Read
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default Post;
