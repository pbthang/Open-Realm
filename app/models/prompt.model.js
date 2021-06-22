module.exports = (sequelize, Sequelize) => {
  const Prompt = sequelize.define("prompt", {
    title: {
      type: Sequelize.STRING
    },
    author_id: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.TEXT
    },
    numberOfAnswers: {
      type: Sequelize.INTEGER
    },
    numberOfBookmarks: {
      type: Sequelize.INTEGER
    },
    comments_id: {
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Prompt;
};
