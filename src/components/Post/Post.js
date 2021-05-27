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

const useStyles = makeStyles({
  root: {
    display: "inline-block",
    margin: "0.5rem",
    height: "7rem",
    width: "19rem",
  },
  title: {
    fontWeight: 500,
    cursor: "default",
  },
  number: {
    fontSize: "1rem",
  },
  action: {
    display: "flex",
    justifyContent: "space-between",
  },
});

function Post({ book }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Tooltip title={book.title} placement="top">
          <Typography noWrap vaiant="h2" className={classes.title}>
            {book.title}
          </Typography>
        </Tooltip>
      </CardContent>

      <CardActions className={classes.action}>
        <Bookmark book={book} />
        <Button size="small" component="a" href={`/home/${book.id}`}>
          Read
        </Button>
      </CardActions>
    </Card>
  );
}

export default Post;
