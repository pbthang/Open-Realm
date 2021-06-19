module.exports = (sequelize, Sequelize) => {
  const PromptBookmark = sequelize.define("prompt bookmark", {
    user_id: {
      type: Sequelize.STRING
    },
    prompt_id: {
      type: Sequelize.INTEGER
    },
  });

  return PromptBookmark;
};
