const chai = require('chai');
const { Console } = require('winston/lib/winston/transports');
const encrypt = require('../../src/security/encrypt');

chai.should();

describe('Encrypt unit tests: ', async () => {
    
    /**
     * Hash a text and check if the hash is 60
     */
    it('Hash a text', (done) => {
        const textHash = encrypt.hashText('Example')
        textHash.should.have.lengthOf(60)
        done()
    });
});