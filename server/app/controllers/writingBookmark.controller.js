const db = require("../models");
const WritingBookmark = db.writingBookmarks;
const Writing = db.writings;
const Op = db.Sequelize.Op;

// Create new writingBookmark
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a writingBookmark
  const writingBookmark = {
    user_id: req.body.user_id,
    writing_id: req.body.writing_id,
  };

  // Save WritingBookmark in the database
  WritingBookmark.create(writingBookmark)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while creating the WritingBookmark."
    });
  });
};

// Find a single WritingBookmark with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  WritingBookmark.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving WritingBookmark with id=" + id
    });
  });
};

// Update a WritingBookmark by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  WritingBookmark.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "WritingBookmark was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update WritingBookmark with id=${id}. Maybe WritingBookmark was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating WritingBookmark with id=" + id
    });
  });
};

// Delete a WritingBookmark with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  WritingBookmark.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "WritingBookmark was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete WritingBookmark with id=${id}. Maybe WritingBookmark was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete WritingBookmark with id=" + id
    });
  });
};

exports.deleteByPara = (req, res) => {
  const user_id = req.query.user_id;
  const writing_id = req.query.writing_id;

  WritingBookmark.destroy({
    where: {
      user_id: user_id,
      writing_id: writing_id
    }
  })
  .then(num => {
      res.send({
        message: `${num} WritingBookmark was deleted successfully!`
      });
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete WritingBookmark with id=" + id
    });
  });
};


// Get all Writing comment
exports.findAll = (req, res) => {
  const user_id = req.query.user_id;
  const writing_id = req.query.writing_id;

  var condition = (user_id || writing_id) ? {
    user_id: { [Op.like]: `${user_id ? user_id : "%"}`}
  } : null;

  if (writing_id) {
    condition.writing_id = { [Op.eq]: `${writing_id}`};
  }

  WritingBookmark.findAll({ where: condition })
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

exports.getWritingByUser = (req, res) => {
  const user_id = req.query.user_id;

  var condition = (user_id) ? {
    user_id: { [Op.like]: `${user_id ? user_id : "%"}`}
  } : null;

  WritingBookmark.findAll({ where: condition })
  .then(data => data.map(cell => cell.writing_id))
  .then(writing_ids => {
    return Writing.findAll({
      where: { id: { [Op.in]: writing_ids}}
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

// Delete all WritingBookmarks from the database.
exports.deleteAll = (req, res) => {
  WritingBookmark.destroy({
    where: {},
    truncate: false
  })
  .then(nums => {
    res.send({ message: `${nums} WritingBookmarks were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while removing all writingBookmarks."
    });
  });
};

// Find all published WritingBookmarks
exports.findAllPublished = (req, res) => {
  WritingBookmark.findAll({ where: { published: true } })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving writingBookmarks."
    });
  });
};
