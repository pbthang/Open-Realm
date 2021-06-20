module.exports = app => {
  const writingBookmarks = require("../controllers/writingBookmark.controller.js");

  var router = require("express").Router();

  // Create a new Chapter
  router.post("/", writingBookmarks.create);

  // Retrieve a single Chapter with id
  router.get("/:id", writingBookmarks.findOne);

  // Get all comments
  router.get("/", writingBookmarks.findAll);

  // Update a Chapter with id
  router.put("/:id", writingBookmarks.update);

  // Delete a Chapter with id
  router.delete("/:id", writingBookmarks.delete);

  // Get writingBy user_id
  router.get("/getbyuser/getwritings", writingBookmarks.getWritingByUser);

  // Delete by user and writing // IDEA:
  router.delete("/", writingBookmarks.deleteByPara);

  app.use('/api/writingBookmarks', router);
};
