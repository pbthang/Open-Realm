import React, { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import Post from "../components/Post";
import { makeStyles } from "@material-ui/core/styles";
import api from "../api/api";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  container: {},
});

function Home() {
  const classes = useStyles();
  const [books, setBooks] = useState([]);

  const retrieveBooks = async () => {
    const response = await api.get("/stories");
    return response.data;
  };

  useEffect(() => {
    const getAllBooks = async () => {
      const allBooks = await retrieveBooks();
      if (allBooks) setBooks(allBooks);
    };

    getAllBooks();
  }, []);

  return (
    <AppShell className={classes.root}>
      {books.map((book, idx) => (
        <Post type="book" book={book} author={book.author} key={idx} />
      ))}
    </AppShell>
  );
}

export default Home;
