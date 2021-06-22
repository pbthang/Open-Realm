const db = require("../models");
const Chapter = db.chapters;
const Op = db.Sequelize.Op;

// Create new chapter
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a chapter
  const chapter = {
    book_id: req.body.book_id,
    pre_chapter_id: req.body.pre_chapter_id,
    title: req.body.title,
    author_id: req.body.author_id,
    content: req.body.content,
    numberOfChapters: 0,
    numberOfBookmarks: 0,
    comments_id: [],
    published: req.body.published
  };

  // Save Chapter in the database
  Chapter.create(chapter)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while creating the Chapter."
    });
  });
};

// Retrieve all chapter from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Chapter.findAll({ where: condition })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving chapters."
    });
  });
};

// Find a single Chapter with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Chapter.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving Chapter with id=" + id
    });
  });
};

// Update a Chapter by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Chapter.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Chapter was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Chapter with id=${id}. Maybe Chapter was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Chapter with id=" + id
    });
  });
};

// Delete a Chapter with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Chapter.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Chapter was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Chapter with id=${id}. Maybe Chapter was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Chapter with id=" + id
    });
  });
};

// Delete all Chapters from the database.
exports.deleteAll = (req, res) => {
  Chapter.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({ message: `${nums} Chapters were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while removing all chapters."
    });
  });
};

// Find all published Chapters
exports.findAllPublished = (req, res) => {
  Chapter.findAll({ where: { published: true } })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving chapters."
    });
  });
};
