const jwt = require('jsonwebtoken');
const statusCode = require('http-status-codes').StatusCodes
const statusError = require('../constants/web/statusError');
const logger = require('../util/logger');
const webError = require('../model/web/webError')

const verifyToken = (req, res, next) => {
    logger.info("Entering in verifyToken")
    const token =
      req.body.token || req.query.token || req.headers["api-key"];
  
    if (!token) {
        response = webError.generateWebError(statusCode.UNAUTHORIZED, statusError.NO_TOKEN_PROVIDED)
        return res.status(statusCode.UNAUTHORIZED).send(response)
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
        response = webError.generateWebError(statusCode.UNAUTHORIZED, statusError.INVALID_TOKEN)
        return res.status(statusCode.UNAUTHORIZED).send(response)
    }
    return next();
  };
  
  module.exports = verifyToken;