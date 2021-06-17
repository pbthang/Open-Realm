module.exports = app => {
  const promptComments = require("../controllers/promptComment.controller.js");

  var router = require("express").Router();

  // Create a new Chapter
  router.post("/", promptComments.create);

  // Retrieve all Chapters
  router.get("/", promptComments.findAll);

  // Retrieve all published Chapters
  router.get("/published", promptComments.findAllPublished);

  // Retrieve a single Chapter with id
  router.get("/:id", promptComments.findOne);

  // Update a Chapter with id
  router.put("/:id", promptComments.update);

  // Delete a Chapter with id
  router.delete("/:id", promptComments.delete);

  app.use('/api/promptComments', router);
};
