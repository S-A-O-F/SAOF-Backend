const encrypt = require("../../security/encrypt")
const logger = require("../../util/logger")

const dao = require('./dao')

module.exports = {
    
    async getUserByToken(token){
        logger.info("Entering in getUserByToken")
        return await dao.getUserByToken(token)
    }
}