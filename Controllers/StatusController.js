class Status {

    constructor() {
        this.status = true;
    }

    getStatus() {
        return this.status
    }

    success() {
        this.status = true
    }

    fail() {
        this.status = false
    }
}

export default Status