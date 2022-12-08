const logger = require('../../util/logger')
const statusCode = require('../../constants/statusCode')
const statusError = require('../../constants/statusError')

const model = require('./model')

module.exports = {

    async login(req, res) {

        logger.info("Requested login")

        try {
            const isDataSended = await model.validateData(req.body)
            logger.debug("Is all data sended: " + isDataSended)

            if (!isDataSended) {
                logger.error("Not all data was sended")
                return res.status(statusCode.BAD_REQUEST).send({
                    "status": statusCode.BAD_REQUEST,
                    "error": statusError.NO_CREDENTIALS
                })
            } else {
                // Obtain the user
                const email = req.body.email
                const password = req.body.password

                const user = await model.getUserByMail(email, password)
            
                return res.status(statusCode.SUCCESS).send(user)
            }

        } catch (error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send({
                "error": error
            })
        }
    }
}