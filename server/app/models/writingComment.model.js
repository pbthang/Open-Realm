module.exports = (sequelize, Sequelize) => {
  const WritingComment = sequelize.define("writing comment", {
    post_id: {
      type: Sequelize.STRING
    },
    author_id: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.TEXT
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return WritingComment;
};
