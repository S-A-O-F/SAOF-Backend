require('dotenv').config();

const logger = require('../../../src/util/logger')

const mongo = require('../../../src/config/database')

const app = require('../../../App')
const chai = require('chai');
const chaiHttp = require('chai-http');

const statusCode = require('../../../src/constants/web/statusCode')
const statusError = require('../../../src/constants/web/statusError')

chai.should();
chai.use(chaiHttp)

// Set the URL constants
const ENDPOINT = "/auth"
const URL = process.env.URL

// Disable the logs
logger.silent = true

describe('Authentication delete test: ', async () => {

    /**
     * 
     
    beforeEach((done), async () => {
        mongo.connect()
        mongo.drop("userTests")
        await User.create({
            email: "example@mail.com",
            password: "11223344.."
        })
        done()
    });
    */

    /**
     * Check the following things:
     * - We send a JSON with no email and the endpoint returns a 400 status
     * - Returns a JSON with the properties "response"
     * - Response field must contains NO_EMAIL_PROVIDED constant
     */
    it('No body sended', (done) => {
        chai.request(URL)
            .delete(ENDPOINT)
            .send()
            .end((err, res) => {
                res.should.have.status(statusCode.BAD_REQUEST)
                res.body.should.be.a('object');
                res.body.should.have.property('response').eql(statusError.NO_EMAIL_PROVIDED);
            })
        done()
    });

    /**
     * Check the following things:
     * - We send a JSON with a email that is not registered in the database 
     *   and the endpoint returns a 400 status
     * - Returns a JSON with the properties "response"
     * - Response field must contains USER_DOESNT_EXISTS constant
     */
    it('User does not exist', (done) => {
        chai.request(URL)
            .delete(ENDPOINT)
            .send({"email": "notexists@mail.com"})
            .end((err, res) => {
                res.should.have.status(statusCode.BAD_REQUEST)
                res.body.should.be.a('object');
                res.body.should.have.property('response').eql(statusError.USER_DOESNT_EXISTS);
            })
        done()
    });

    /**
     * Check the following things:
     * - We send a JSON with an email and the endpoint returns a 203 status
     * - Returns a JSON with the properties of the user
     * - Active field must contains false
     */
    it('User deleted', (done) => {
        chai.request(URL)
            .delete(ENDPOINT)
            .send({"email": "test@mail.com"})
            .end((err, res) => {
                res.should.have.status(statusCode.ACCEPTED)
                res.body.should.be.a('object');
                res.body.should.have.property('active').eql(false);
            })
        done()
    });
});