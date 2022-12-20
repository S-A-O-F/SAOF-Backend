const logger = require('../../util/logger')
const statusCode = require('http-status-codes').StatusCodes
const statusError = require('../../constants/web/statusError')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const model = require('./model')
const webError = require('../../model/web/webError')

module.exports = {

    async uploadPhoto(req, res) {
        logger.info("Requested upload photo")

        // Declare response
        let response

        try {

            // Check if files were sended
            if(!req.files){
                response = webError.generateWebError(statusCode.BAD_REQUEST, statusError.NOT_FILE_PRIOVIDED)
                return res.status(statusCode.BAD_REQUEST).send(response)
            }

            // Get user by token 
            const token = req.body.token || req.query.token || req.headers["api-key"];
            let user = await model.getUserByToken(token)

            if(!user){
                logger.info("User with email " + token + " not founded")
                response = webError.generateWebError(statusCode.BAD_REQUEST, statusError.USER_DOESNT_EXISTS)
                return res.status(statusCode.BAD_REQUEST).send(response)
            }

            // Save the photos in the server
            const listIdPhotos = await model.savePhotos(req.files)

            if(!listIdPhotos){
                logger.info("No photo was saved")
                response = webError.generateWebError(statusCode.BAD_REQUEST, statusError.USER_DOESNT_EXISTS)
                return res.status(statusCode.BAD_REQUEST).send(response)
            }

            user = model.addPhotoIds(user, listIdPhotos)
            logger.debug(user._id)
            logger.debug(listIdPhotos[0])
            logger.debug(user.listPhotos)

            user = await model.updateUser(user)

            return res.status(statusCode.OK).send(user)

        } catch (error) {
            logger.error(error)
            response = webError.generateWebError(statusCode.INTERNAL_SERVER_ERROR, statusError.UNEXPECTED_ERROR)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response)
        }
    }
}