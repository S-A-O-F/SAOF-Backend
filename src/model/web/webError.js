class WebError {
    constructor(status, response) {
      this.status = status;
      this.response = response;
    }

    toJson(){
        return {
            "status": this.status,
            "response": this.response
        }
    }
  }