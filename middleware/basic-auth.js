const userAdapter = require("../bll/user-adapter");
const baseController = require("../controllers/base-controller");
const respTypes = require("../resp-types");

async function basicAuth(req, res, next) {
  
  // check for basic auth header
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
      baseController.sendResponseData(respTypes.result.NOT_AUTHORIZED, { message: 'Your not authorized to use this service' }, res);
  }
  else{
    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    try{
      const user = await userAdapter.authenticate({ inputEmailUsername: username, inputPassword: password });
      // attach user to request object
      req.user = user;
      next();

    }
    catch(err){
      baseController.sendResponseData(respTypes.result.NOT_AUTHORIZED, { message: 'Invalid Authentication Credentials' }, res);
    }
  }

}

module.exports = basicAuth;