const logger = require("../../util/logger")

const User = require('../../model/database/user')
const Photo = require('../../model/database/photo')

module.exports = {
    
    async getUserByToken(token){
        logger.info("Entering in getUserByToken")
        return await User.findOne({token})
    },

    async savePhoto(photo){
        logger.info("Entering in savePhoto")
        return await Photo.create({
            name: photo.filename,
            tmpPath: photo.path,
            encoding: photo.encoding,
            size: photo.size
            //extension: photo.filename.split(".")[-1].to
        })
    },

    async updateUser(user){
        logger.info("Entering in updateUser")
        return await User.findByIdAndUpdate(user, {
            listPhotos: user.listPhotos
        })
    }
}