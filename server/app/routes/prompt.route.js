module.exports = app => {
  const prompts = require("../controllers/prompt.controller.js");

  var router = require("express").Router();

  // Create a new Chapter
  router.post("/", prompts.create);

  // Retrieve all Chapters
  router.get("/", prompts.findAll);

  // Retrieve all published Chapters
  router.get("/published", prompts.findAllPublished);

  // Retrieve a single Chapter with id
  router.get("/:id", prompts.findOne);

  // Update a Chapter with id
  router.put("/:id", prompts.update);

  // Delete a Chapter with id
  router.delete("/:id", prompts.delete);

  app.use('/api/prompts', router);
};
