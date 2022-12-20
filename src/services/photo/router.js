const express = require('express')
const controller = require('./controller')
const authMiddleware = require('../../middleware/auth')

const multer = require('multer')
const setUpUpload = require('../../middleware/upload');
const upload = multer({ storage: setUpUpload.setUpUpload() })

const router = express.Router()

router.post('/photo', upload.array("photos"), controller.uploadPhoto)
//router.get('/photo', controller.downloadPhoto)
//router.delete('/photo', authMiddleware, controller.deletePhoto)

module.exports = router