#!/usr/bin/env node
"strict mode";
"esversion:6";

module.exports.database = {
	url: 'mongodb://localhost/set-meetings',
	options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        poolSize: 2,
        keepAlive: 300000,
        connectTimeoutMS: 30000,
		user: 'ahmed',
		pass: 'ahmed'
	}
};

module.exports.app = {
	appStage: true, // true for development and false for live
	port: process.env.PORT || 5000
};

module.exports.secret = {
    jwt_secret: "secret"
}
