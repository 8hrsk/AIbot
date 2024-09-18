import Status from "./StatusController.js";

class ResponseController {
    constructor(response) {
        this.status = new Status();
        try {
            this.response = JSON.parse(response);
        } catch (error) {
            this.status.fail();
            this.response = response;
        }
    }

    message() {
        if (this.status.getStatus() === false) {
            return this.response
        }

        return this.response.response
    }

    Instruction() {
        if (this.status.getStatus() === false) {
            return false
        }

        return this.response.callInst
    }
}

export default ResponseController