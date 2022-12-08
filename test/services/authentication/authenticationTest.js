require('dotenv').config();

const logger = require('../../../src/util/logger')

const app = require('../../../App')
const chai = require('chai');
const chaiHttp = require('chai-http');

const statusCode = require('../../../src/constants/statusCode')
const statusError = require('../../../src/constants/statusError')

chai.should();
chai.use(chaiHttp)

const ENDPOINT = "/auth"
const URL = process.env.URL

// Disable the logs
logger.silent = true

describe('Authentication test: ', async () => {
    
    /**
     * Check the following things
     * - The endpoint returns a 400 response 
     */
    it('Check auth', (done) => {
        chai.request(URL)
            .post(ENDPOINT)
            .send()
            .end((err, res) => {
                res.should.have.status(statusCode.BAD_REQUEST)
            })
        done()
    });

    /**
     * Check the following things
     * - The endpoint returns a 400 response
     *   if it receives only email 
     */
    it('Check only email sended', (done) => {
        chai.request(URL)
            .post(ENDPOINT)
            .send({
                "email": "example@mail.com"
            })
            .end((err, res) => {
                res.should.have.status(statusCode.BAD_REQUEST)
            })
        done()
    });

    /**
     * Check the following things
     * - The endpoint returns a 400 response
     *   if the email doesn´t contain . 
     */
    it('Check only email not @', (done) => {
        chai.request(URL)
            .post(ENDPOINT)
            .send({
                "email": "examplemail.com",
                "password": "JohnDoe73.."
            })
            .end((err, res) => {
                res.should.have.status(statusCode.BAD_REQUEST)
            })
        done()
    });

    /**
     * Check the following things
     * - The endpoint returns a 400 response
     *   if the email doesn´t contain . 
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
            })
        done()
    });

    /**
     * Check the following things
     * - The endpoint returns a 400 response
     *   if it receives only password 
     */
    it('Check only password sended', (done) => {
        chai.request(URL)
            .post(ENDPOINT)
            .send({
                "password": 1234
            })
            .end((err, res) => {
                res.should.have.status(statusCode.BAD_REQUEST)
            })
        done()
    });
});