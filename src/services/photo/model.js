const encrypt = require("../../security/encrypt")
const logger = require("../../util/logger")

const dao = require('./dao')

module.exports = {
    
    async getUserByToken(token){
        logger.info("Entering in getUserByToken")
        return await dao.getUserByToken(token)
    },
    
    async savePhotos(files){
        logger.info("Entering in savePhotos")
        
        let listPhotoId = []

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const photoSaved = await dao.savePhoto(file)
            const id = photoSaved._id.toString()
            logger.debug(id) 
            listPhotoId.push(id)  
        }

        return listPhotoId
    },

    async addPhotoIds(user, listIds){
        logger.info("Entering in addPhotoIds")
        
        for (let i = 0; i < listIds.length; i++) {
            const id = listIds[i];
            user.listPhotos.push(id)
        }

        return user
    },

    async updateUser(user){
        logger.info("Entering in updateUser")
        return await dao.updateUser(user)
    }
}