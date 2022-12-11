const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {type: String, default: null},
    password: {type: String},
    token: {type: String},
    lastActiveAt: {type: Date, default: Date.now()},
    creationDate: {type: Date, default: Date.now()},
    active: {type: Boolean, default: true},
})

module.exports = mongoose.model("user", userSchema)