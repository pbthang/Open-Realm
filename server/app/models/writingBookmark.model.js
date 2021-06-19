module.exports = (sequelize, Sequelize) => {
  const WritingBookmark = sequelize.define("writing bookmark", {
    user_id: {
      type: Sequelize.STRING
    },
    writing_id: {
      type: Sequelize.INTEGER
    },
  });

  return WritingBookmark;
};
