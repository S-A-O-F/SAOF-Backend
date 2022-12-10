const jwt = require('jsonwebtoken');
const statusCode = require('../constants/statusCode');
const logger = require('../util/logger');

const verifyToken = (req, res, next) => {
    logger.info("Entering in verifyToken")
    const token =
      req.body.token || req.query.token || req.headers["api-key"];
  
    if (!token) {
        return new WebError(statusCode.UNAUTHORIZED, statusError.NO_TOKEN_PROVIDED).toJson()
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
        return new WebError(statusCode.UNAUTHORIZED, statusError.INVALID_TOKEN).toJson()
    }
    return next();
  };
  
  module.exports = verifyToken;