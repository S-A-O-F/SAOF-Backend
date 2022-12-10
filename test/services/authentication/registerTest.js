require('dotenv').config();

const logger = require('../../../src/util/logger')

const app = require('../../../App')
const chai = require('chai');
const chaiHttp = require('chai-http');

const statusCode = require('../../../src/constants/statusCode')
const statusError = require('../../../src/constants/statusError')

chai.should();
chai.use(chaiHttp)

// Set the URL constants
const ENDPOINT = "/auth"
const URL = process.env.URL

// Disable the logs
logger.silent = true

describe('Authentication register test: ', async () => {
    
    /**
     * Check the following things:
     * - We send no JSON and the endpoint returns a 400 status
     * - Returns a JSON with the properties "error" and "status"
     * - Error field must contains NO_CREDENTIALS_PROVIDED constant
     * - Status field must be BAD_REQUEST 
     */
    it('No JSON sended', (done) => {
        chai.request(URL)
            .post(ENDPOINT)
            .send()
            .end((err, res) => {
                res.should.have.status(statusCode.BAD_REQUEST)
                res.body.should.be.a('object');
                res.body.should.have.property('response').eql(statusError.NO_CREDENTIALS_PROVIDED);
            })
        done()
    });

    /**
     * Check the following things:
     * - We send a JSON only with the email field 
     *   and the endopoint returns a 400 status
     * - Returns a JSON with the properties "error" and "status"
     * - Error field must contains NO_CREDENTIALS_PROVIDED constant
     * - Status field must be BAD_REQUEST  
     */
    it('Only email sended', (done) => {
        chai.request(URL)
            .post(ENDPOINT)
            .send({
                "email": "example@mail.com"
            })
            .end((err, res) => {
                res.should.have.status(statusCode.BAD_REQUEST)
                res.body.should.be.a('object');
                res.body.should.have.property('response').eql(statusError.NO_CREDENTIALS_PROVIDED);
            })
        done()
    });

    /**
     * Check the following things:
     * - We send a JSON but the email doesn´t contains an @
     *   and the endopoint returns a 400 status
     * - Returns a JSON with the properties "error" and "status"
     * - Error field must contains NOT_VALID_EMAIL constant
     * - Status field must be BAD_REQUEST  
     */
    it('The email not contains an @', (done) => {
        chai.request(URL)
            .post(ENDPOINT)
            .send({
                "email": "examplemail.com",
                "password": "JohnDoe73.."
            })
            .end((err, res) => {
                res.should.have.status(statusCode.BAD_REQUEST)
                res.body.should.be.a('object');
                res.body.should.have.property('response').eql(statusError.NOT_VALID_EMAIL);
            })
        done()
    });

    /**
     * Check the following things:
     * - We send a JSON but the email doesn´t contains a .
     *   and the endopoint returns a 400 status
     * - Returns a JSON with the properties "error" and "status"
     * - Error field must contains NOT_VALID_EMAIL constant
     * - Status field must be BAD_REQUEST  
     */
    it('Check only email not .', (done) => {
        chai.request(URL)
            .post(ENDPOINT)
            .send({
                "email": "example@mailcom",
                "password": "JohnDoe73.."
            })
            .end((err, res) => {
                res.should.have.status(statusCode.BAD_REQUEST)
                res.body.should.be.a('object');
                res.body.should.have.property('response').eql(statusError.NOT_VALID_EMAIL);
            })
        done()
    });

    /**
     * Check the following things:
     * - We send a JSON only with the email field 
     *   and the endopoint returns a 400 status
     * - Returns a JSON with the properties "error" and "status"
     * - Error field must contains NO_CREDENTIALS_PROVIDED constant
     * - Status field must be BAD_REQUEST  
     */
    it('Only password sended', (done) => {
        chai.request(URL)
            .post(ENDPOINT)
            .send({
                "password": 1234
            })
            .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('response').eql(statusError.NO_CREDENTIALS_PROVIDED);
            })
        done()
    });
});