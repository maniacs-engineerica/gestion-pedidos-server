export default class PdfCreator {
  constructor(creator) {
    this.creator = creator
  }
  create() {
    return this.creator.create()
  }
}