#!/usr/bin/env node
"strict mode";
"esversion:6";

const respTypes = require("../resp-types");
const baseController = require("./base-controller");
const userAdapter = require("../bll/user-adapter");

async function findUser(email) {
    const user = await User.findOne({ email });
    return user;
}

exports.registerUser = async function registerUser(req, res) {
    try{
        const userResp = await userAdapter.registerUser(req.body);
        baseController.sendResponseData(respTypes.result.CREATED, userResp, res);
    }
    catch (err) {
        err.code === 11000 ? baseController.sendResponseData(respTypes.result.USER_EXISTS, { error: err.errmsg }, res)
                            : baseController.sendUnhandledError({ error: err.message },res)
    }   
}

exports.authenticate = async function authenticate(req, res) {
    const { emailUsername, password } = req.body
    try{
        const userResp = await userAdapter.authenticate(emailUsername, password);
        baseController.sendResponseData(respTypes.result.SUCCESS, userResp, res);
    }
    catch (err) {
        baseController.sendUnhandledError({ error : err.message },res)
    }   
}

