const express = require('express')
const controller = require('./contoller')

const router = express.Router();

// Define the endpoints
router.get('/status', controller.getStatus)

module.exports = router
