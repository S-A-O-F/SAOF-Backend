const logger = require('../../util/logger')
//const model = require('./model')

const packageJson = require('../../../package.json')

module.exports = {

    async getStatus(req, res){
        
        // Getting request info
        var ip = req.ip;
        var hostname = req.hostname
        var originalUrl = req.originalUrl

        // Logging request info
        logger.info("Requested status")
        logger.info("IP: " + ip)
        logger.info("Hostname: " + hostname)
        logger.info("Original URL: " + originalUrl)

        // Setting the response
        res.status(200)
        res.setHeader('Content-Type', 'application/json')

        return res.send({
            "author": packageJson.author,
            "version": packageJson.version
        })
    }
}