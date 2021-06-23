import React from "react";
import Post from "../../components/Post/Post";
import { render, screen } from "@testing-library/react";

xit("Prompt posts render correctly", async () => {
  const book = {
    id: 1,
    title: "title",
    author_id: "1",
    content: "content",
    numberOfBookmarks: 0,
    createdAt: "2021-06-21T11:28:08.404Z",
  };
  render(<Post type="prompt" book={book} />);
  expect(await screen.findByText(book.title)).toBeInTheDocument();
});
