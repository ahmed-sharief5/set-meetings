#!/bin/env node
"esversion:6";
"strict mode";

const express = require("express");
const bodyParser = require("body-parser");
const config = require("../config");
const db = require("../db").db;
const routes = require("../routes/api-routes");

// Create express application	   
const app = express();

// Associate Body-Parser to parse the data sent using Post
app.use(bodyParser.urlencoded({extended:true,limit: '20mb'}));
app.use(bodyParser.json({limit: '20mb'}));

// Server starts listening!!

let server = app.listen(config.app.port);
server.timeout = 60000;
if(config.app.appStage){
    console.log('Set Meetings services are started!!! Running on %d',config.app.port);
}

// Connect to Mongo
db.connect(config.database.url, config.database.options);

app.use('/api/v1', routes);

module.exports = server;
