module.exports = app => {
  const writingComments = require("../controllers/writingComment.controller.js");

  var router = require("express").Router();

  // Create a new Chapter
  router.post("/", writingComments.create);

  // Retrieve all Chapters
  router.get("/", writingComments.findAll);

  // Retrieve all published Chapters
  router.get("/published", writingComments.findAllPublished);

  // Retrieve a single Chapter with id
  router.get("/:id", writingComments.findOne);

  // Update a Chapter with id
  router.put("/:id", writingComments.update);

  // Delete a Chapter with id
  router.delete("/:id", writingComments.delete);

  app.use('/api/writingComments', router);
};
