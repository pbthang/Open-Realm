const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const compression = require("compression");
const helmet = require("helmet");
const path = require("path");

dotenv.config();

const app = express();

// var corsOptions = {
//   origin: "http://localhost:3000",
// };

app.use(cors());

// comprpess http
app.use(compression());

// protect from well-known vulnerability
app.use(helmet());

// serve static build
app.use(express.static(path.join(__dirname, 'client/build')))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

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
