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

        await files.forEach(async (file) => {
            const photoSaved = await dao.savePhoto(file)
            const id = photoSaved._id
            logger.debug(id) 
            listPhotoId.push(id)          
        });

        return listPhotoId
    },

    addPhotoIds(user, listIds){
        logger.info("Entering in addPhotoIds")
        
        listIds.forEach(id =>{
            user.listPhotos.push(id)
        })

        return user
    },

    async updateUser(user){
        logger.info("Entering in updateUser")
        return await dao.updateUser(user)
    }
}