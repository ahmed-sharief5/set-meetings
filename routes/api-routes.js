#!/usr/bin/env node
"strict mode";
"esversion:6";

const app = require("express").Router();
const basicAuth = require("../middleware/basic-auth");

const userController = require("../controllers/user-controller");
const meetingSlotController = require("../controllers/meeting-slot-controller");

/** Healthcheck api **/
app.get('/healthcheck', (req, res, next) => {
    res.status(200).send({
        message: "Server is up and running"
    }) 
})

/**  User Routes **/
app.post('/registerUser', userController.registerUser);

/** Meeting Slot Routes **/
app.post('/defineUserSlot', basicAuth, meetingSlotController.userDefiningSlots);
app.get('/getAllMeetings', basicAuth, meetingSlotController.getAllMeetings);

/** Booking Slot Routes **/
app.post('/bookUserSlot', basicAuth, meetingSlotController.userBookingSlot);
app.get('/getAllMyBookings', basicAuth, meetingSlotController.getAllMyBookings);

module.exports = app;