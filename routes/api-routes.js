#!/usr/bin/env node
"strict mode";
"esversion:6";

const app = require("express").Router();
const basicAuth = require("../middleware/basic-auth");

const userController = require("../controllers/user-controller");
const meetingSlotController = require("../controllers/meeting-slot-controller");

/**  User Routes **/
app.post('/registerUser', userController.registerUser);

/** Meeting Slot Routes **/
app.post('/defineUseSlot', meetingSlotController.userDefiningSlots);

module.exports = app;