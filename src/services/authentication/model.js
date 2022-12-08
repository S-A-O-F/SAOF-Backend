const statusError = require("../../constants/statusError")
const statusSuccess = require("../../constants/statusSuccess")
const logger = require("../../util/logger")

const dao = require('./dao')

module.exports = {
    
    async validateData(body){

        logger.info("Validanting data")

        var response = {
            isValid: false,
            response: ""
        }

        const email = body.email
        const password = body.password

        const isNotEmpty = email && password 
        logger.debug("Are email and password provided? " + isNotEmpty)

        response.response = statusError.NO_CREDENTIALS_PROVIDED

        if(isNotEmpty){
            
            const isValidEmail = await this.verifyEmail(email)
            response.response = isValidEmail ? response.response : statusError.NOT_VALID_EMAIL

            const isValidPassword = await this.verifyPassword(password)
            response.response = isValidPassword ? response.response : statusError.NOT_VALID_PASSWORD

            response.isValid = isValidEmail && isValidPassword
            logger.debug("Are email and password valid? " + response.isValid)
        }
        
        return response
    },

    async validateDataRegister(body){
        
        logger.info("Validanting data register")

        var response = await this.validateData(body)

        const isValidateData = response.isValid

        if(isValidateData){
            
            const password = body.password
            const repeatPassword = body.repeatPassword
    
            if(repeatPassword){
                const hasTheSamePassword = repeatPassword == password
                response.response = hasTheSamePassword ? response.response : statusError.PASSWORDS_NOT_MACHING
                response.isValid = isValidateData && hasTheSamePassword
            }else{
                response.isValid = false
                response.response = statusError.NOT_REPEAT_PASSWORD_PROVIDED
            }
        }

        return response
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
        const isValidCharacters = true
        logger.debug("Password has the corrent characters: " + isValidCharacters)

        return isValidLength && isValidCharacters
    },

    async getUserByMail(email, password){
        logger.info("Getting user by email")

        const user = JSON.stringify({
            "username": "JohnDoe",
            "email": email
        })

        return user
    },

    async createUserByMail(email, password){
        logger.info("Creating a user by email")

        var response = {
            isValid: false,
            response: "",
        }

        const oldUser = await dao.checkIfUserExists(email)

        if (oldUser){
            response.response = statusError.USER_ALREADY_EXISTS
        } else{
            const user = await dao.createUserByEmail(email, password)
            response.isValid = true
            response.response = statusSuccess.USER_CREATED
            response.user = user
        }

        return response
    }
}