export default class PdfCreator {
  constructor(creator) {
    this.creator = creator
  }
  create(purchase) {
    return this.creator.create(purchase)
  }
}