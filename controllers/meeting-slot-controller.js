#!/usr/bin/env node
"strict mode";
"esversion:6";

const respTypes = require("../resp-types");
const baseController = require("./base-controller");
const meetinSlotAdapter = require("../bll/meeting-slot-adapter");

exports.userDefiningSlots = async function userDefiningSlots(req, res) {
    try{
        const meetingSlotResp = await meetinSlotAdapter.userDefiningSlots(req.body);
        baseController.sendResponseData(respTypes.result.SUCCESS, meetingSlotResp, res);
    }
    catch(err){
        baseController.sendUnhandledError({ error : err.message },res)
    }
}