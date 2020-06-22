export default class InvalidFormatError {
    constructor(message, description) {
      this.status = 400
      this.message = message
      this.description = description
    }
  }