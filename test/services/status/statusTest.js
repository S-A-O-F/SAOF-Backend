require('dotenv').config();

const logger = require('../../../src/util/logger')

const app = require('../../../App')
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp)

const ENDPOINT = "/status"
const URL = process.env.URL

// Disable the logs
logger.silent = true

describe('Status test: ', async () => {
    
    /**
     * Check the following things
     * - The endpoint returns a 200 response
     */
    it('Check status', (done) => {
        chai.request(URL)
            .get(ENDPOINT)
            .end((err, res) => {
                res.should.have.status(200)
            })
        done()
    });

    /**
     * Check the following things
     * - The content type is json
     */
     it('Check headers', (done) => {
        chai.request(URL)
            .get(ENDPOINT)
            .end((err, res) => {
                res.should.have.header('content-type', 'application/json; charset=utf-8')
            })
        done()
    });

    /**
     * Check the following things
     * - The body is an object, not an array
     * - The lenght is equal to 2 
     */
    it('Check body', (done) => {
        chai.request(URL)
            .get(ENDPOINT)
            .end((err, res) => {
                res.body.should.be.a('object')
                res.body.lenght.should.be.eq(2)
            })
        done()
    });
});