module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define("book", {
    title: {
      type: Sequelize.STRING
    },
    author_id: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    numberOfChapters: {
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

  return Book;
};
