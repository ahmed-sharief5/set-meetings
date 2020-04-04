#!/usr/bin/env node
"strict mode";
"esversion:6";

const app = require("express").Router();
const accessMiddleware = require("../middleware/access");

const userController = require("../controllers/user-controller");

/**  User Routes **/
app.post('/registerUser', userController.registerUser);
app.post('/authenticate', userController.authenticate);


module.exports = app;