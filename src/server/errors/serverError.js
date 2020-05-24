export default class ServerError {
    constructor (status, message, description) {
        this.status = status
        this.message = message
        this.description = description
    }
}