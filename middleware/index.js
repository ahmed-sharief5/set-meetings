const bodyParser = require("body-parser");
const cookieMiddleware = require("universal-cookie-express")
const cors = require('cors');

module.exports = app => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieMiddleware());
  app.use(cors());
};