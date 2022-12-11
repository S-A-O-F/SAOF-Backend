const logger = require('../../util/logger')
const statusCode = require('../../constants/statusCode')
const statusError = require('../../constants/statusError')

const model = require('./model')
const webError = require('../../model/web/webError')

module.exports = {

    async login(req, res) {
        logger.info("Requested login")

        // Declare response
        var response

        try {
            // Check if body is not empty
            const isBodyEmpty = await model.checkRequestBodyLogin(req.body)

            if(isBodyEmpty){
                logger.info("The request body is empty")
                response = webError.generateWebError(statusCode.BAD_REQUEST, statusError.NO_CREDENTIALS_PROVIDED)
                return res.status(statusCode.BAD_REQUEST).send(response)
            }

            // Obtain and verify email
            const email = req.body.email
            const password = req.body.password

            // Check if user exists
            const user = await model.getUserByMail(email)

            if(!user){
                logger.info("User with email " + email + " not founded")
                response = webError.generateWebError(statusCode.BAD_REQUEST, statusError.USER_DOESNT_EXISTS)
                return res.status(statusCode.BAD_REQUEST).send(response)
            }

            // Check if the password match
            const arePasswordsEqual = await model.checkPasswords(password, user.password)

            if(!arePasswordsEqual){
                logger.info("The passwords do not match")
                response = webError.generateWebError(statusCode.BAD_REQUEST, statusError.INVALID_CREDENTIALS)
                return res.status(statusCode.BAD_REQUEST).send(response)
            }

            // Generate token
            const generatedToken = await model.createUserToken(user._id, email)

            if (!generatedToken){
                response = webError.generateWebError(statusCode.INTERNAL_SERVER_ERROR, statusError.ERROR_GENERATING_TOKEN)
                return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response)
            }

            // Assign JWT to the user
            user.token = generatedToken

            return res.status(statusCode.SUCCESS).send(user)

        } catch (error) {
            logger.error(error)
            response = webError.generateWebError(statusCode.INTERNAL_SERVER_ERROR, statusError.UNEXPECTED_ERROR)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response)
        }
    },

    async register(req, res) {

        logger.info("Requested register")

        // Declare response
        var response

        try {
            // Check if body is not empty
            const isBodyEmpty = await model.checkRequestBodyRegister(req.body)

            if(isBodyEmpty){
                logger.info("The request body is empty")
                response = webError.generateWebError(statusCode.BAD_REQUEST, statusError.NO_CREDENTIALS_PROVIDED)
                return res.status(statusCode.BAD_REQUEST).send(response)
            }

            // Obtain and verify email
            const email = req.body.email
            const isValidEmail = await model.verifyEmail(email)

            if(!isValidEmail){
                response = webError.generateWebError(statusCode.BAD_REQUEST, statusError.NOT_VALID_EMAIL)
                return res.status(statusCode.BAD_REQUEST).send(response)
            }

            // Obtain and verify password
            const password = req.body.password
            const isValidPassword = await model.verifyPassword(password)

            if(!isValidPassword){
                response = webError.generateWebError(statusCode.BAD_REQUEST, statusError.NOT_VALID_PASSWORD)
                return res.status(statusCode.BAD_REQUEST).send(response)
            }

            const repeatPassword = req.body.repeatPassword
            const arePasswordsEqual = await model.checkRepeatPassword(password, repeatPassword)

            if(!arePasswordsEqual){
                response = webError.generateWebError(statusCode.BAD_REQUEST, statusError.PASSWORDS_NOT_MATCH)
                return res.status(statusCode.BAD_REQUEST).send(response)
            }

            // Check if the user already exists in the database
            const databaseUser = await model.getUserByMail(email)

            if(databaseUser){
                response = webError.generateWebError(statusCode.BAD_REQUEST, statusError.USER_ALREADY_EXISTS)
                return res.status(statusCode.BAD_REQUEST).send(response)
            }

            const user = await model.createUserByMail(email, password)

            if(!user){
                response = webError.generateWebError(statusCode.BAD_REQUEST, statusError.USER_HAS_NOT_BEEN_CREATED)
                return res.status(statusCode.BAD_REQUEST).send(response)
            }

            // Generate token
            const generatedToken = await model.createUserToken(user._id, email)

            if (!generatedToken){
                response = webError.generateWebError(statusCode.INTERNAL_SERVER_ERROR, statusError.ERROR_GENERATING_TOKEN)
                return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response)
            }

            // Assign JWT to the user
            user.token = generatedToken

            return res.status(statusCode.CREATED).send(user)

        } catch (error) {
            logger.error(error)
            response = webError.generateWebError(statusCode.INTERNAL_SERVER_ERROR, statusError.UNEXPECTED_ERROR)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response)
        }
    },

    async delete(req, res) {
        logger.info("Requested delete")

        // Declare response
        var response

        try {
            // Check if body is not empty
            const isBodyEmpty = await model.checkRequestBodyDelete(req.body)

            if(isBodyEmpty){
                logger.info("The request body is empty")
                response = webError.generateWebError(statusCode.BAD_REQUEST, statusError.NO_EMAIL_PROVIDED)
                return res.status(statusCode.BAD_REQUEST).send(response)
            }     

            // Check if user exists
            const email = req.body.email
            const user = await model.getUserByMail(email)

            if(!user){
                logger.info("User with email " + email + " not founded")
                response = webError.generateWebError(statusCode.BAD_REQUEST, statusError.USER_DOESNT_EXISTS)
                return res.status(statusCode.BAD_REQUEST).send(response)
            }

            // Delete the user
            const isUserDeleted = await model.deleteUser(user)

            if(!isUserDeleted){
                logger.info("User with email " + email + " can not be deleted")
                response = webError.generateWebError(statusCode.BAD_REQUEST, statusError.USER_NOT_DELETED)
                return res.status(statusCode.BAD_REQUEST).send(response)
            }

            user.active = false

            return res.status(statusCode.ACCEPTED).send(user)

        } catch (error) {
            logger.error(error)
            response = webError.generateWebError(statusCode.INTERNAL_SERVER_ERROR, statusError.UNEXPECTED_ERROR)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(response)
        }
    },
}