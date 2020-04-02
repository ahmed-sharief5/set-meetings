let AppConfig = {};

if (process.env.NODE_ENV === "production") {
  AppConfig = require("./config.prod");
} else {
  AppConfig = require("./config.dev");
}

module.exports = AppConfig;
