let dotenv = require("dotenv");
dotenv.config();

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.POSTGRES_USERNAME,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  DB: process.env.POSTGRES_DB,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
