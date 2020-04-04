async function accessMiddleware(req, res, next) {
    try {
      const access_token = req.universalCookies.get("token");
      if (access_token) {
        req.headers["access_token"] = access_token;
        next();
      } else {
        res.status(500).json({ message : "No access token provided"});
      }
    } catch (err) {
      res.status(500).json({ message : "No access token provided"});
    }
  }
  
  module.exports = accessMiddleware;