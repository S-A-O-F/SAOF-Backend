const encrypt = require("../../security/encrypt")
const logger = require("../../util/logger")

const dao = require('./dao')

module.exports = {
    
    async getUserByToken(token){
        logger.info("Entering in getUserByToken")
        return await dao.getUserByToken(token)
    },
    
    async savePhotos(user, files){
        logger.info("Entering in savePhotos")
        
        files.forEach(async (file) => {
            const photoId = await dao.savePhoto(file)
            
        });
    }
}