const db = require("../models");
const Prompt = db.prompts;
const Op = db.Sequelize.Op;

// Create new prompt
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a prompt
  const prompt = {
    title: req.body.title,
    author_id: req.body.author_id,
    content: req.body.content,
    numberOfAnswers: 0,
    numberOfBookmarks: 0,
    comments_id: [],
    published: req.body.published
  };

  // Save Prompt in the database
  Prompt.create(prompt)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while creating the Prompt."
    });
  });
};

// Retrieve all prompt from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  const content = req.query.content;
  const author_id = req.query.author_id;

  var condition = (title || content || author_id) ? {
    title: { [Op.iLike]: `%${title ? title : ""}%`},
    content: { [Op.iLike]: `%${content ? content : ""}%`},
    author_id: { [Op.like]: `${author_id ? author_id : "%"}`}
  } : null;

  Prompt.findAll({ where: condition })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving prompts."
    });
  });
};

// Find a single Prompt with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Prompt.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving Prompt with id=" + id
    });
  });
};

// Update a Prompt by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Prompt.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Prompt was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Prompt with id=${id}. Maybe Prompt was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Prompt with id=" + id
    });
  });
};

// Delete a Prompt with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Prompt.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Prompt was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Prompt with id=${id}. Maybe Prompt was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Prompt with id=" + id
    });
  });
};

// Delete all Prompts from the database.
exports.deleteAll = (req, res) => {
  Prompt.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({ message: `${nums} Prompts were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while removing all prompts."
    });
  });
};

// Find all published Prompts
exports.findAllPublished = (req, res) => {
  Prompt.findAll({ where: { published: true } })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving prompts."
    });
  });
};
