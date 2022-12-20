const logger = require("../../util/logger")

const User = require('../../model/database/user')

module.exports = {
    
    async checkIfUserExists(email){
        logger.info("Entering in checkIfUserExists")
        return await User.findOne({email})
    },

    async createUserByEmail(email, password){
        logger.info("Entering in createUserByEmail")
        return await User.create({
            email: email.toLowerCase().trim(),
            password: password
        })
    },

    async deleteUser(user){
        logger.info("Entering in deleteUser")
        return await User.updateOne(user, {
            "active": false
        })
    },

    async updateUser(user){
        logger.info("Entering in updateUser")
        return await User.updateOne(user, {
            "token": user.token
        })
    }
}