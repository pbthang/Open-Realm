module.exports = app => {
  const writings = require("../controllers/writing.controller.js");

  var router = require("express").Router();

  // Create a new Chapter
  router.post("/", writings.create);

  // Retrieve all Chapters
  router.get("/", writings.findAll);

  // Retrieve all published Chapters
  router.get("/published", writings.findAllPublished);

  // Retrieve a single Chapter with id
  router.get("/:id", writings.findOne);

  // Update a Chapter with id
  router.put("/:id", writings.update);

  // Delete a Chapter with id
  router.delete("/:id", writings.delete);

  app.use('/api/writings', router);
};
