const bcrypt = require('bcrypt')

module.exports = {
    /**
     * This method hashs a given text
     * @param {*} text the text to encrypt
     * @returns the string hashed
     */
    hashText(text){
        return bcrypt.hashSync(text, 10)
    },

    /**
     * This method compares the hash of to strings
     * @param {*} inputText the first text
     * @param {*} expectedHash the second text
     * @returns a boolean which indicates if the two hashes
     *          are the same
     */
    compareHash(inputText, expectedHash){
        const inputTextHash = this.hashText(inputText)
        return bcrypt.compareSync(inputTextHash, expectedHash)
    }
}