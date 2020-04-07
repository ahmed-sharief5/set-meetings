#!/usr/bin/env node
"strict mode";
"esversion:6";

module.exports.database = {
	url: process.env.MONGODB_URI,
	options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        poolSize: 2,
        keepAlive: 300000,
        connectTimeoutMS: 30000,
        user: '',
		pass: ''
	}
};

module.exports.app = {
	port: process.env.PORT || 5000,
};

module.exports.secret = {
    jwt_secret: ""
}
