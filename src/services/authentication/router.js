const express = require('express')
const controller = require('./controller')
const authMiddleware = require('../../middleware/auth')

const router = express.Router()

router.get('/auth', authMiddleware, controller.login)
router.post('/auth', controller.register)
router.delete('/auth', authMiddleware, controller.delete)

module.exports = router