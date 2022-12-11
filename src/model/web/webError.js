module.exports = {
    generateWebError(status, response){
        return {
            "status": status,
            "response": response
        }
    }
  }