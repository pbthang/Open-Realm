const db = require("../models");
const WritingComment = db.writingComments;
const Op = db.Sequelize.Op;

// Create new writingComment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a writingComment
  const writingComment = {
    post_id: req.body.post_id,
    author_id: req.body.author_id,
    content: req.body.content,
    published: req.body.published
  };

  // Save WritingComment in the database
  WritingComment.create(writingComment)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while creating the WritingComment."
    });
  });
};

// Find a single WritingComment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  WritingComment.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving WritingComment with id=" + id
    });
  });
};

// Get all writing comment
exports.findAll = (req, res) => {
  const post_id = req.query.post_id;
  const content = req.query.content;
  const author_id = req.query.author_id;

  var condition = (post_id || content || author_id) ? {
    post_id: { [Op.like]: `${post_id ? post_id : "%"}`},
    content: { [Op.iLike]: `%${content ? content : ""}%`},
    author_id: { [Op.like]: `${author_id ? author_id : "%"}`}
  } : null;

  WritingComment.findAll({ where: condition })
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

// Update a WritingComment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  WritingComment.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "WritingComment was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update WritingComment with id=${id}. Maybe WritingComment was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating WritingComment with id=" + id
    });
  });
};

// Delete a WritingComment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  WritingComment.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "WritingComment was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete WritingComment with id=${id}. Maybe WritingComment was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete WritingComment with id=" + id
    });
  });
};

// Delete all WritingComments from the database.
exports.deleteAll = (req, res) => {
  WritingComment.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({ message: `${nums} WritingComments were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while removing all writingComments."
    });
  });
};

// Find all published WritingComments
exports.findAllPublished = (req, res) => {
  WritingComment.findAll({ where: { published: true } })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving writingComments."
    });
  });
};
