const jwt = require('jsonwebtoken');
const logger = require('../util/logger');

module.exports = {

    signUserToken(id, email){
        logger.info("Creating user token")

        return token = jwt.sign(
            {user_id: id, email},
            process.env.TOKEN_KEY,
            {expiresIn: "2h",}
        )
    }
}