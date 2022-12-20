const mongoose = require('mongoose')

const collection = process.env.NODE_ENV === "dev" ? "userTest" : "user"

const userSchema = new mongoose.Schema({
    email: {type: String, default: null},
    password: {type: String},
    token: {type: String, default: null},
    lastActiveAt: {type: Date, default: Date.now()},
    creationDate: {type: Date, default: Date.now()},
    active: {type: Boolean, default: true},
})

module.exports = mongoose.model(collection, userSchema)