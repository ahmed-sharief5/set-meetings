#!/usr/bin/env node
"strict mode";
"esversion:6";

const sMTypes = require("../resp-types");
const dbConnection = require("../db");
const config = require("../config");
const logger = require('../helpers/utility').logger;
const SMResponse = sMTypes.sMResponse;
let resp;

const sendResponseData = (result,data,response) => {
    resp = new SMResponse(result,data);
    response.status(200).send(resp);
};

const sendCustomError = (result, response) => {
    result = parseInt(result);
    resp = new SMResponse(result, '');
    response.status(200).send(resp);
};

const sendUnhandledError = (e,res) => {
    let [error, response] = [e, res];	
    return new Promise((resolve, reject)=>resolve())
    .then(()=>{
        if(config.app.appStage)	{
            console.error("::::::::::::::::::: Base controller Error :::::::::::::::::::::: \n"+error);
        }
        
        resp = new SMResponse(sMTypes.result.SERVER_ERROR,error);
        
        response.status(500).send(resp);
        _processShutDown(error);
    })
    .catch((err)=>{
        if(config.app.appStage)
            console.error(err);
        _processShutDown(error);
    });
};
    
const _processShutDown = (error) => {
    // Send email to the System Admin
    logger.log('info', 'Base Controller Error::::: ErrorMessage : %s,::::: ErrorStack : %s', error.message, error.stack);
    
    dbConnection.closeConnection();
    setTimeout(function(){
        process.exit(1);
    },1000);
};


module.exports.sendResponseData = sendResponseData;
module.exports.sendCustomError = sendCustomError;
module.exports.sendUnhandledError = sendUnhandledError;