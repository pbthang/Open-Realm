const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize(process.env.DATABASE_URL)
    : new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
          max: dbConfig.pool.max,
          min: dbConfig.pool.min,
          acquire: dbConfig.pool.acquire,
          idle: dbConfig.pool.idle,
        },
      });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = require("./book.model.js")(sequelize, Sequelize);
db.chapters = require("./chapter.model.js")(sequelize, Sequelize);
db.prompts = require("./prompt.model.js")(sequelize, Sequelize);
db.promptComments = require("./promptComment.model.js")(sequelize, Sequelize);
db.writings = require("./writing.model.js")(sequelize, Sequelize);
db.writingComments = require("./writingComment.model.js")(sequelize, Sequelize);
db.promptBookmarks = require("./promptBookmark.model.js")(sequelize, Sequelize);
db.writingBookmarks = require("./writingBookmark.model.js")(
  sequelize,
  Sequelize
);

module.exports = db;
