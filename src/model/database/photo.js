const mongoose = require('mongoose')

const collection = process.env.NODE_ENV === "dev" ? "photoTest" : "photo"

const photoSchema = new mongoose.Schema({
    name: {type: String, default: null},
    url: {type: String, default: null},
    tmpPath: {type: String, default: null},
    encoding: {type: String, default: null},
    size: {type: Number, default: null},
    extension: {type: String, default: null},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
    active: {type: Boolean, default: true},
})

module.exports = mongoose.model(collection, photoSchema)