const statusCode = require("../../constants/statusCode")
const statusError = require("../../constants/statusError")
const statusSuccess = require("../../constants/statusSuccess")
const webError = require("../../model/web/webError")
const encrypt = require("../../security/encrypt")
const jwtManager = require("../../security/jwtManager")
const logger = require("../../util/logger")

const dao = require('./dao')

module.exports = {
    
    async checkRequestBodyLogin(body){
        logger.info("Entering in checkRequestBodyLogin")
        const email = body.email
        const password = body.password
        return !email || !password 
    },

    async checkRequestBodyRegister(body){
        logger.info("Entering in checkRequestBodyRegister")
        const email = body.email
        const password = body.password
        const repeatPassword = body.repeatPassword
        return !email || !password || !repeatPassword
    },

    async checkRepeatPassword(password, repeatPassword){
        logger.info("Entering in checkRepeatPassword")
        return repeatPassword == password
    },

    async verifyEmail(email){
        logger.info("Verifying email")

        // Email has to contain a "."
        const hasDot = email.includes(".")
        logger.debug("Email contains a dot? " + hasDot)

        // Email has to contain a "@"
        const hasAtSign = email.includes("@")
        logger.debug("Email contains an at sign? " + hasAtSign)

        return hasDot && hasAtSign
    },

    async verifyPassword(password){
        logger.info("Verifying password")

        // Password has to be longer than 8 characters
        const isValidLength = password.length >= 8
        logger.debug("Password length: " + password.length)
        logger.debug("Password has the corrent length: " + isValidLength)

        // Has to have special characters
        // TODO: Regex for check the pass
        const isValidCharacters = true
        logger.debug("Password has the corrent characters: " + isValidCharacters)

        return isValidLength && isValidCharacters
    },

    async getUserByMail(email){
        logger.info("Getting user by email")

        const user = await dao.checkIfUserExists(email)

        return user
    },

    async checkPasswords(inputPassword, databasePassword){
        return encrypt.compareHash(inputPassword, databasePassword)
    },

    async createUserToken(userId, email){
        return jwtManager.signUserToken(userId, email)
    },

    async createUserByMail(email, password){
        logger.info("Entering in createUserByMail")

        // Create user in the database
        const hashedPassword = encrypt.hashText(password)
        const user = await dao.createUserByEmail(email, hashedPassword)
        logger.debug("User created with ID: " + user._id)

        return user
    }
}