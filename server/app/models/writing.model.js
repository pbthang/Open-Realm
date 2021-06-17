module.exports = (sequelize, Sequelize) => {
  const Writing = sequelize.define("writing", {
    title: {
      type: Sequelize.STRING
    },
    prompt_id: {
      type: Sequelize.INTEGER
    },
    author_id: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.TEXT
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

  return Writing;
};
