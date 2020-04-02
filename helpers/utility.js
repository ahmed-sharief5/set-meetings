#!/usr/bin/env node
"strict mode";
"esversion:6";

const winston = require("winston");

// Logger for logging Errors
module.exports.logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
        name: 'error-file',
        filename: './Errorlog/error.log',
        level: 'info'
        }),
        new (winston.transports.File)({
        name: 'seviour-error-file',
        filename: './Errorlog/seviour-error.log',
        level: 'error'
        })
    ]
});