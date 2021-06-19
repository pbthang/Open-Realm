module.exports = app => {
  const writingBookmarks = require("../controllers/writingBookmark.controller.js");

  var router = require("express").Router();

  // Create a new Chapter
  router.post("/", writingBookmarks.create);

  // Retrieve all published Chapters
  router.get("/published", writingBookmarks.findAllPublished);

  // Retrieve a single Chapter with id
  router.get("/:id", writingBookmarks.findOne);

  // Get all comments
  router.get("/", writingBookmarks.findAll);

  // Update a Chapter with id
  router.put("/:id", writingBookmarks.update);

  // Delete a Chapter with id
  router.delete("/:id", writingBookmarks.delete);

  app.use('/api/writingBookmarks', router);
};
