export default class PurchaseAdd {
  constructor(dao, pdfCreator, notificator, validator) {
    this.dao = dao
    this.pdfCreator = pdfCreator
    this.notificator = notificator
    this.validator = validator
  }

  async run(purchase) {
    this.validator.validate(purchase)

    purchase.state = "Recibido";
    purchase.date = new Date().toISOString()

    const newPurchase = await this.dao.add(purchase)

    this._createPdf(newPurchase)
    this._notifyStateUpdate(newPurchase.client.phoneNumber, newPurchase.state)

    return newPurchase
  }

  _createPdf(purchase) {
    this.pdfCreator.create(purchase) 
  }

  _notifyStateUpdate(phone, state){
    this.notificator.send(phone, state)
  }

}