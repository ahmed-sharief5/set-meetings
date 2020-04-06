//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server-test');
const should = chai.should();
chai.use(chaiHttp);

const userTest = require("./user.test");

describe('Users', () => {
    userTest(chai, server)
});
