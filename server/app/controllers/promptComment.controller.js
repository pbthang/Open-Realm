const db = require("../models");
const PromptComment = db.promptComments;
const Op = db.Sequelize.Op;

// Create new promptComment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a promptComment
  const promptComment = {
    post_id: req.body.post_id,
    author_id: req.body.author_id,
    content: req.body.content,
    published: req.body.published
  };

  // Save PromptComment in the database
  PromptComment.create(promptComment)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while creating the PromptComment."
    });
  });
};

// Retrieve all promptComment from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  PromptComment.findAll({ where: condition })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving promptComments."
    });
  });
};

// Find a single PromptComment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PromptComment.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving PromptComment with id=" + id
    });
  });
};

// Update a PromptComment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  PromptComment.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "PromptComment was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update PromptComment with id=${id}. Maybe PromptComment was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating PromptComment with id=" + id
    });
  });
};

// Delete a PromptComment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PromptComment.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "PromptComment was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete PromptComment with id=${id}. Maybe PromptComment was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete PromptComment with id=" + id
    });
  });
};

// Delete all PromptComments from the database.
exports.deleteAll = (req, res) => {
  PromptComment.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({ message: `${nums} PromptComments were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while removing all promptComments."
    });
  });
};

// Find all published PromptComments
exports.findAllPublished = (req, res) => {
  PromptComment.findAll({ where: { published: true } })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving promptComments."
    });
  });
};
