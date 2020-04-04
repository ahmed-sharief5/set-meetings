#!/usr/bin/env node
"strict mode";
"esversion:6";

const config = require('../config');
const db = require('../db');
const bcrypt = require('bcryptjs');
const { User } = db;
const jwt = require('jsonwebtoken');
const respTypes = require("../resp-types");

async function generateToken(payload){
    try{
        const token = await jwt.sign(payload, config.secret.jwt_secret, { expiresIn: '1h' });
        return token;
    }
    catch(err){
        throw err;
    }
}

async function findUser(emailUsername) {
    const user = await User.findOne({$or:[{ email:emailUsername },{ username:emailUsername }]});
    return user;
}

async function registerUser(user) {
    try{
        const newUser = new User({ ...user });

        if (user.password) {
            newUser.password = bcrypt.hashSync(user.password, 10);
        }
        const registeredUser = await newUser.save();

        const { username, email } = registeredUser;
        return { username, email }
    }
    catch (err) {
        throw err;
    }  
}

async function authenticate(data) {
    const { inputEmailUsername, inputPassword } = data;
    try{
        const user = await findUser(inputEmailUsername);
        if(user != null) {
            const { username, password, _id } = user;

            if (user && bcrypt.compareSync(inputPassword, password)) {                
                return { username, _id };
            }
            else{
                return {
                    code : respTypes.result.USER_CREDENTIALS_INCORRECT,
                    message: "Username or password is wrong"
                }
            }
        }
        else{
            return {
                code : respTypes.result.USER_NOT_EXISTS,
                message: "User not found"
            }
        }
        
    }
    catch (err) {
        throw err;
    }

}

module.exports.registerUser = registerUser;
module.exports.authenticate = authenticate;
