const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// sync tables
const db = require("./app/models");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

require("./app/routes/book.route.js")(app);
require("./app/routes/chapter.route.js")(app);
require("./app/routes/prompt.route.js")(app);
require("./app/routes/promptComment.route.js")(app);
require("./app/routes/writing.route.js")(app);
require("./app/routes/writingComment.route.js")(app);
require("./app/routes/promptBookmark.route.js")(app);
require("./app/routes/writingBookmark.route.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
