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

    async checkRequestBodyDelete(body){
        logger.info("Entering in checkRequestBodyDelete")
        return !body.email
    },

    async checkRepeatPassword(password, repeatPassword){
        logger.info("Entering in checkRepeatPassword")
        return repeatPassword == password
    },

    async verifyEmail(email){
        logger.info("Entering in verifyEmail")

        // Email has to contain a "."
        const hasDot = email.includes(".")
        logger.debug("Email contains a dot? " + hasDot)

        // Email has to contain a "@"
        const hasAtSign = email.includes("@")
        logger.debug("Email contains an at sign? " + hasAtSign)

        return hasDot && hasAtSign
    },

    async verifyPassword(password){
        logger.info("Entering in verifyPassword")

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
        logger.info("Entering in getUserByMail")
        return await dao.checkIfUserExists(email)
    },

    async checkPasswords(inputPassword, databasePassword){
        logger.info("Entering in checkPasswords")
        return encrypt.compareHash(inputPassword, databasePassword)
    },

    async createUserToken(userId, email){
        logger.info("Entering in createUserToken")
        return jwtManager.signUserToken(userId, email)
    },

    async createUserByMail(email, password){
        logger.info("Entering in createUserByMail")
        const hashedPassword = encrypt.hashText(password)
        return await dao.createUserByEmail(email, hashedPassword)
    },

    async deleteUser(user){
        logger.info("Entering in deleteUser")
        return await dao.deleteUser(user)
    }
}