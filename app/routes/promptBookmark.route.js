module.exports = app => {
  const promptBookmarks = require("../controllers/promptBookmark.controller.js");

  var router = require("express").Router();

  // Create a new Chapter
  router.post("/", promptBookmarks.create);

  // Retrieve a single Chapter with id
  router.get("/:id", promptBookmarks.findOne);

  // Get all comments
  router.get("/", promptBookmarks.findAll);

  // Update a Chapter with id
  router.put("/:id", promptBookmarks.update);

  // Delete a Chapter with id
  router.delete("/:id", promptBookmarks.delete);

  // Delete by user and prompt // IDEA:
  router.delete("/", promptBookmarks.deleteByPara);

  // Get promptBy user_id
  router.get("/getbyuser/getprompts", promptBookmarks.getPromptByUser);

  app.use('/api/promptBookmarks', router);
};
