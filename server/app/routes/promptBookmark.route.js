module.exports = app => {
  const promptBookmarks = require("../controllers/promptBookmark.controller.js");

  var router = require("express").Router();

  // Create a new Chapter
  router.post("/", promptBookmarks.create);

  // Retrieve all published Chapters
  router.get("/published", promptBookmarks.findAllPublished);

  // Retrieve a single Chapter with id
  router.get("/:id", promptBookmarks.findOne);

  // Get all comments
  router.get("/", promptBookmarks.findAll);

  // Update a Chapter with id
  router.put("/:id", promptBookmarks.update);

  // Delete a Chapter with id
  router.delete("/:id", promptBookmarks.delete);

  app.use('/api/promptBookmarks', router);
};
