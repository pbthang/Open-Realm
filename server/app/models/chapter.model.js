module.exports = (sequelize, Sequelize) => {
  const Chapter = sequelize.define("chapter", {
    book_id: {
      type: Sequelize.INTEGER
    },
    pre_chapter_id: {
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    author_id: {
      type: Sequelize.STRING
    },
    content: {
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

  return Chapter;
};
