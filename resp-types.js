#!/usr/bin/env node
"strict mode";
"esversion:6";

module.exports.result = {
	SUCCESS: 0,            // Success for all response if successful

	/*** 1 to 5 User related error codes ***/
	EMAIL_EXISTS: 1, // Email already exists
	USER_NOT_EXISTS: 2, // User not exists
	USER_EXISTS: 3, // User exists
	USER_CREDENTIALS_INCORRECT: 4, // Password is wrong
    
    /*** HTTP Status codes ***/
    SUCCESS: 200,
    CREATED: 201,
    NOT_AUTHORIZED: 401,
    NOT_FOUND: 404,
	SERVER_ERROR: 500,

};

// Structures
module.exports.sMResponse = function (result, data) {
	this.result = result;
	this.data = data;
};