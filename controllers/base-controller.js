#!/usr/bin/env node
"strict mode";
"esversion:6";

const sMTypes = require("../resp-types");
const dbConnection = require("../helpers/db-helper");
const config = require("../config");
const logger = require('../helpers/utility').logger;
const SMResponse = sMTypes.sMResponse;
let resp;

const sendResponseData = (result,data,response) => {
    resp = new SMResponse(result,data);
    response.status(200).send(resp);
    return data;
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
            console.error("::::::::::::::::::: Base controller Error :::::::::::::::::::::: \n"+error.stack);
            resp = new SMResponse(sMTypes.result.SERVER_ERROR,error.stack);
        }
        else
            resp = new SMResponse(sMTypes.result.SERVER_ERROR,"");
        
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
    
    if(config.envType != 'Development'){
        mail.sendErrorMail("<b style='color:orange,font-size:17px'>Base Controller Error</b><br/><br/><b style='color:red'>Error Message : </b>"+error.message+"<br/><br/><B style='color:red'>Stack Trace : </b>"+error.stack+"<br/><br/>")
        .then((result)=>{
            dbConnection.closeConnection();
            setTimeout(function(){
                process.exit(1);
            },1000);
        })
    }
    else{
        dbConnection.closeConnection();
        setTimeout(function(){
            process.exit(1);
        },1000);
    }
};


module.exports.sendResponseData = sendResponseData;
module.exports.sendCustomError = sendCustomError;
module.exports.sendUnhandledError = sendUnhandledError;