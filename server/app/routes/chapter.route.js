module.exports = app => {
  const chapters = require("../controllers/chapter.controller.js");

  var router = require("express").Router();

  // Create a new Chapter
  router.post("/", chapters.create);

  // Retrieve all Chapters
  router.get("/", chapters.findAll);

  // Retrieve all published Chapters
  router.get("/published", chapters.findAllPublished);

  // Retrieve a single Chapter with id
  router.get("/:id", chapters.findOne);

  // Update a Chapter with id
  router.put("/:id", chapters.update);

  // Delete a Chapter with id
  router.delete("/:id", chapters.delete);

  app.use('/api/chapters', router);
};
