const db = require("../models");
const PromptBookmark = db.promptBookmarks;
const Prompt = db.prompts;
const Op = db.Sequelize.Op;

// Create new promptBookmark
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_id || !req.body.prompt_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a promptBookmark
  const promptBookmark = {
    user_id: req.body.user_id,
    prompt_id: req.body.prompt_id,
  };

  // Save PromptBookmark in the database
  PromptBookmark.create(promptBookmark)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while creating the PromptBookmark."
    });
  });
};

// Find a single PromptBookmark with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PromptBookmark.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving PromptBookmark with id=" + id
    });
  });
};

// Update a PromptBookmark by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  PromptBookmark.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "PromptBookmark was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update PromptBookmark with id=${id}. Maybe PromptBookmark was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating PromptBookmark with id=" + id
    });
  });
};

// Delete a PromptBookmark with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PromptBookmark.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "PromptBookmark was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete PromptBookmark with id=${id}. Maybe PromptBookmark was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete PromptBookmark with id=" + id
    });
  });
};

exports.deleteByPara = (req, res) => {
  const user_id = req.query.user_id;
  const prompt_id = req.query.prompt_id;

  PromptBookmark.destroy({
    where: {
      user_id: user_id,
      prompt_id: prompt_id
    }
  })
  .then(num => {
      res.send({
        message: `${num} promptBookmark was deleted successfully!`
      });
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete PromptBookmark with id=" + id
    });
  });
};

// Get all Prompt bookmark
exports.findAll = (req, res) => {
  const user_id = req.query.user_id;
  const prompt_id = req.query.prompt_id;

  var condition = (user_id) ? {
    user_id: { [Op.like]: `${user_id ? user_id : "%"}`}
  } : null;

  if (prompt_id) {
    condition.prompt_id = { [Op.eq]: `${prompt_id}`};
  }

  PromptBookmark.findAll({ where: condition })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving comments."
    });
  });
};

exports.getPromptByUser = (req, res) => {
  const user_id = req.query.user_id;

  var condition = (user_id) ? {
    user_id: { [Op.like]: `${user_id ? user_id : "%"}`}
  } : null;

  PromptBookmark.findAll({ where: condition })
  .then(data => data.map(cell => cell.prompt_id))
  .then(prompt_ids => {
    return Prompt.findAll({
      where: { id: { [Op.in]: prompt_ids}}
    })
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving comments."
    });
  });
};

// Delete all PromptBookmarks from the database.
exports.deleteAll = (req, res) => {
  PromptBookmark.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({ message: `${nums} PromptBookmarks were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while removing all promptBookmarks."
    });
  });
};

// Find all published PromptBookmarks
exports.findAllPublished = (req, res) => {
  PromptBookmark.findAll({ where: { published: true } })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving promptBookmarks."
    });
  });
};
