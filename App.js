// Import .env variables
require('dotenv').config();

// Setup the logger
const logger = require('./src/util/logger')

// Configure express
const express = require('express')
const app = express()
const port = process.env.PORT

// Define the routes
app.use(require('./src/services/status/router'))

// Start the server
app.listen(port, () => {
  logger.info(`Server initialized, runnig at port ${port}`)
})