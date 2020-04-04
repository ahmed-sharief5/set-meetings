#!/usr/bin/env node
"strict mode";
"esversion:6";

const mongoose = require('mongoose');
const config = require("../config");

const db = {
  // Connects to mongoDB
  connect: function(url, options) {
	mongoose.connect(url, options);
    mongoose.connection.on('open', function(){
      if(config.app.appStage)	
    	  console.log("Connected to mongo successfully");
    });
       
    mongoose.connection.on('disconnect', function(){
      if(config.app.appStage)	
    	  console.log("Mongo disconnected");
    });

    mongoose.connection.on('error',function (err) {
    	if(config.app.appStage)	
    		console.log('Mongoose default connection error: ' + err);
    });
    
    process.on('SIGINT', function() {
      mongoose.connection.close(function () {
    	  if(config.app.appStage)	
    		  console.log('Mongoose default connection disconnected through app termination');
    	  process.exit(0);
      });
    });
    
    module.exports.closeConnection = function(){
    	if(typeof mongoose.connection != 'undefined'){
    		mongoose.connection.close(function(){
    			 if(config.app.appStage)	
    	   		  console.log('MongoDB connection terminated Successfully....!');
    		});
    	}
    }
    
  }
}

module.exports = {
  User: require('../models/user-schema')
};

module.exports.db = db;