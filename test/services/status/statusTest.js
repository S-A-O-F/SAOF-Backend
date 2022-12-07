require('dotenv').config();

const app = require('../../../App')
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp)

const ENDPOINT = "/status"
const URL = process.env.URL

describe('Status test: ', async () => {
    // Check if the endpoint is available
    it('Check status', (done) => {
        chai.request(URL)
            .get(ENDPOINT)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    });
});