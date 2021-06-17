module.exports = (sequelize, Sequelize) => {
  const PromptComment = sequelize.define("prompt comment", {
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

  return PromptComment;
};
