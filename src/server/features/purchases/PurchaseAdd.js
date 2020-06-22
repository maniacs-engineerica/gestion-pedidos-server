import InvalidFormatError from "../../errors/invalidFormatError.js";
import Purchase from "../../model/Purchase.js";
import PurchaseNotificationSender from "./PurchaseNotificationSender.js";

export default class PurchaseAdd {
  constructor(dao, pdfCreator, sender) {
    this.dao = dao
    this.pdfCreator = pdfCreator
    this.sender = sender
  }

  async run(purchase) {
    PurchaseAdd.checkPurchase(purchase)

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
    const notificator = new PurchaseNotificationSender(this.sender)
    notificator.send(phone, state)
  }

  static checkPurchase(purchase){
    try {
      Purchase.validate(purchase)
    } catch (error) {
      throw new InvalidFormatError("El pedido no tiene un formato válido", error);
    }
  }

}