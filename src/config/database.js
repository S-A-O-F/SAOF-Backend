const mongoose = require('mongoose')
const logger = require('../util/logger')

const MONGO_URI = process.env.MONGO_URI

exports.connect = () => {
    mongoose.connect(
        MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            //useCreateIndex: true,
            //useFindAndModify: false,
        }
    )
    .then(() => {
        logger.info("Database connected")
    })
    .catch((error) => {
        logger.error("Database connection failed...")
        logger.error(error)
    })
}