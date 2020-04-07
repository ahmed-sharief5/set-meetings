#!/bin/env node
"esversion:6";
"strict mode";

const express = require("express");
const cluster = require('cluster');
const mongoose = require("mongoose");
const https = require('https');
const bodyParser = require("body-parser");
const config = require("./config");
const db = require("./db").db;
const dbConnection = require("./db");
const routes = require("./routes/api-routes");
const logger = require("./helpers/utility").logger;

if (cluster.isMaster){
    // Count the machine's CPUs
  const CPUcount = require('os').cpus().length; 
  for(let i=0; i<CPUcount; i++)  // Create a worker for each CPU
        cluster.fork();  
}
else {
    // Create express application	   
	const app = express();

	// Associate Body-Parser to parse the data sent using Post
	app.use(bodyParser.urlencoded({extended:true,limit: '20mb'}));
	app.use(bodyParser.json({limit: '20mb'}));

	app.rejectUnauthorized = true;
	
	//Set headers for all incoming requests
	app.all('/*', function(request, response, next) {
		response.header('Access-Control-Allow-Origin', '*');
		response.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Key');
		response.header('Access-Control-Expose-Headers','*');
		response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, HEAD');
		response.header('Access-Control-Allow-Credentials', 'true');
		response.header('Access-Control-Max-Age', '1209600');
		next();
    });

    // Server starts listening!!

    let server = app.listen(config.app.port);
    server.timeout = 60000;
    if(config.app.appStage){
        console.log('Set Meetings services are started!!! Running on %d',config.app.port);
    }

    // Connect to Mongo
    db.connect(config.database.url, config.database.options);
    
    app.use('/api/v1', routes);

    //development error handler
	app.use(function(err, req, res, next) {
		console.log(req.body);
		if(config.app.appStage)
			console.error("::::::::::::::::::::::::::::::: Seviour Error ::::::::::::::::::::::::::::: \n"+err.stack);
		
		logger.log('error', 'Seviour Error::::: ErrorMessage : %s,::::: ErrorStack : %s,::::: ErrorNumber : %s', err.message, err.stack, err.errno);		
	    res.status(500);
	    res.end(err.message);

        dbConnection.closeConnection();
        setTimeout(function(){
            process.exit(1);
        },1000);
	});

}

//Listen for dying workers
cluster.on('exit', function (worker) {
    if(config.app.appStage){		
        console.warn("Worker with ID "+worker.id+" died :(");
        console.warn("\n:::::::::::: Server Restarting ::::::::::::\n");
    }
    // Replace the dead worker, 
    cluster.fork();
});
