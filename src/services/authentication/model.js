const logger = require("../../util/logger")

module.exports = {
    
    async validateData(body){
        logger.info("Validanting data")
        var response = false

        const email = body.email
        const password = body.password

        const isNotEmpty = email && password 
        logger.debug("Are email and password provided? " + isNotEmpty)

        if(isNotEmpty){
            const isValidEmail = await this.verifyEmail(email)
            const isValidPassword = await this.verifyPassword(password)

            response = isValidEmail && isValidPassword
            logger.debug("Are email and password valid? " + response)
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
    }
}