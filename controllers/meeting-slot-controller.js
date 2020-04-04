#!/usr/bin/env node
"strict mode";
"esversion:6";

const respTypes = require("../resp-types");
const baseController = require("./base-controller");
const meetingSlotAdapter = require("../bll/meeting-slot-adapter");

exports.userDefiningSlots = async function userDefiningSlots(req, res) {
    const { _id } = req.user;
    try{
        const meetingSlotResp = await meetingSlotAdapter.userDefiningSlots(req.body, _id);
        baseController.sendResponseData(respTypes.result.SUCCESS, meetingSlotResp, res);
    }
    catch(err){
        baseController.sendUnhandledError({ error : err.message },res)
    }
}

exports.userBookingSlot = async function userBookingSlot(req, res) {
    const { _id } = req.user;
    try{
        const bookingSlotResp = await meetingSlotAdapter.userBookingSlot(req.body, _id);
        baseController.sendResponseData(respTypes.result.SUCCESS, bookingSlotResp, res);
    }
    catch(err){
        baseController.sendUnhandledError({ error : err.message },res)
    }
}

exports.getAllMyBookings = async function getAllMyBookings(req, res) {
    const { _id } = req.user;
    try{
        const bookingSlotResp = await meetingSlotAdapter.getAllMyBookings(_id);
        baseController.sendResponseData(respTypes.result.SUCCESS, bookingSlotResp, res);
    }
    catch(err){
        baseController.sendUnhandledError({ error : err.message },res)
    }
}

exports.getAllMeetings = async function getAllMeetings(req, res) {
    const { _id } = req.user;
    try{
        const bookingSlotResp = await meetingSlotAdapter.getAllMeetings(_id);
        baseController.sendResponseData(respTypes.result.SUCCESS, bookingSlotResp, res);
    }
    catch(err){
        baseController.sendUnhandledError({ error : err.message },res)
    }
}