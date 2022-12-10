const logger = require('../../util/logger')
const statusCode = require('../../constants/statusCode')
const statusError = require('../../constants/statusError')

const model = require('./model')

module.exports = {

    async login(req, res) {

        logger.info("Requested login")

        try {
            const validatedResponse = await model.validateData(req.body)
            const isDataValid = validatedResponse.isValid
            logger.debug("Is all data sended: " + isDataValid)

            if (!isDataValid) {
                logger.error("Not all data was sended")
                return res.status(statusCode.BAD_REQUEST).send({
                    "status": statusCode.BAD_REQUEST,
                    "response": validatedResponse.response
                })
            } else {
                // Obtain the user
                const email = req.body.email
                const password = req.body.password

                const user = await model.getUserByMail(email, password)

                if(user.response){
                    return res.status(statusCode).send(user)
                }

                return res.status(statusCode.SUCCESS).send(user)
            }

        } catch (error) {
            logger.error(error)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send({
                "response": error
            })
        }
    },

    async register(req, res) {

        logger.info("Requested register")

        try {
            const validatedResponse = await model.validateDataRegister(req.body)
            const isDataValid = validatedResponse.isValid
            logger.debug("Is all data sended: " + isDataValid)

            if (!isDataValid) {
                logger.error("Not all data was sended")
                return res.status(statusCode.BAD_REQUEST).send({
                    "status": statusCode.BAD_REQUEST,
                    "response": validatedResponse.response
                })
            } else {
                // Obtain the user
                const email = req.body.email
                const password = req.body.password

                const userResponse = await model.createUserByMail(email, password)

                if(!userResponse.isValid){
                    return res.status(statusCode.BAD_REQUEST).send({
                        "status": statusCode.BAD_REQUEST,
                        "response": userResponse.response
                    })
                }else{
                    return res.status(statusCode.CREATED).send({
                        "status": statusCode.CREATED,
                        "response": userResponse.response,
                        "user": userResponse.user
                    })
                }
            }

        } catch (error) {
            logger.error(error)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send({
                "error": error
            })
        }
    }
}