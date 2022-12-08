const logger = require("../../util/logger")

const User = require('../../model/database/user')

module.exports = {
    
    async checkIfUserExists(email){

        logger.info("Checking if user with email " + email + " exists")

        return await User.findOne({email})
    },

    async createUserByEmail(email, password){

        logger.info("Creating user with email " + email)

        return await User.create({
            email: email.toLowerCase().trim(),
            password: password
        })
    }
}