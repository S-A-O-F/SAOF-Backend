const multer = require('multer')
const fs = require('fs')
const path = require('path')

exports.setUpUpload = () =>
    multer.diskStorage({
    destination: function (req, file, cb) {
        const id = req.body._id || req.query.id || req.headers["id"];
        const tmpPath = "./tmp/" + id + "/"
        fs.mkdirSync(tmpPath, { recursive: true })
        cb(null, tmpPath)
    },
    filename: function (req, file, cb) {
        const originalFileName = file.originalname
        cb(null,  Date.now() + "-" + originalFileName)
    }
  })