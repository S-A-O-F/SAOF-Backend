const express = require('express')
const controller = require('./controller')

const router = express.Router()

router.post('/auth', controller.login)
//router.post('/auth', controller.register)

module.exports = router