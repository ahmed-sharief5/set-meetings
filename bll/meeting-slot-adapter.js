#!/usr/bin/env node
"strict mode";
"esversion:6";

const config = require('../config');
const db = require('../db');
const { MeetingSlot } = db;
const respTypes = require("../resp-types");

async function userDefiningSlots(data){
    try{
        const defineSlot = new MeetingSlot({ ...data });
        defineSlot.available = data.time;
        return defineSlot;

    }
    catch(err){
        throw err;
    }

}

module.exports.userDefiningSlots = userDefiningSlots;
