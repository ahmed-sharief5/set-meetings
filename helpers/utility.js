#!/usr/bin/env node
"strict mode";
"esversion:6";

const winston = require("winston");

var options = {
    file: {
      level: 'info',
      name: 'file.info',
      filename: './Errorlog/info.log',
      handleExceptions: false,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 100,
      colorize: true,
    },
    errorFile: {
      level: 'error',
      name: 'file.error',
      filename: './Errorlog/error.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 100,
      colorize: true,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

let logger = winston.createLogger({
    transports: [
      new (winston.transports.Console)(options.console),
      new (winston.transports.File)(options.errorFile),
      new (winston.transports.File)(options.file)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// Logger for logging Errors
module.exports.logger = logger;