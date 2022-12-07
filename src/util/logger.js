const { format } = require('winston');
const winston = require('winston');
const moment = require('moment')

module.exports = winston.createLogger({
  level: 'debug',
  // Format the output of the log
  format: winston.format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(info => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)
  ),
  // Define the out path 
  transports: [
    new winston.transports.File({
      maxsize: process.env.LOG_MAX_SIZE,
      maxFiles: process.env.LOG_MAX_FILES,
      filename: `${__dirname}/../../logs/`+ moment(new Date()).format('YYYY-MM-DD')+ `.log`
    }),
    //Configuration for the console
    new winston.transports.Console({})
  ],
});