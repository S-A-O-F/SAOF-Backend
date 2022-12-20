const logger = require("../../util/logger")

const User = require('../../model/database/user')

module.exports = {
    
    async getUserByToken(token){
        logger.info("Entering in getUserByToken")
        return await User.findOne({token})
    }
}