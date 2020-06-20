
import Purchase from "../model/Purchase.js"
import NotificationSender from "../notification/NotificationSender.js"
import TwilioSender, { TwilioMessage } from "../notification/TwilioSender.js"
import PurchasePdfCreator from "../pdf/PurchasePdfCreator.js"
import PdfCreator from "../pdf/PdfCreator.js"
import InvalidRequestError from "../errors/invalidRequestError.js"
import PurchasesDAOFactory from "../data/purchase/daoFactory.js"
import PurchaseStates from "../enums/PurchaseStates.js"

class PurchasesApi {
  constructor() {
    this.dao = PurchasesDAOFactory.getDao()
  }

  async add(purchase) {
    PurchasesApi.checkPurchase(purchase)

    purchase.state = "Recibido";
    purchase.date = new Date().toISOString()

    const newPurchase = await this.dao.add(purchase)

    this._createPdf(newPurchase)
    this._notifyStateUpdate(newPurchase.client.phoneNumber, newPurchase.state)

    return newPurchase
  }

  async update(id, purchase) {
    PurchasesApi.checkPurchase(purchase)

    const oldPurchase = await this.dao.getById(id)
    this._validateUpdate(oldPurchase, purchase)

    const updatedPurchase = await this.dao.update(id, purchase)

    if(oldPurchase.state != updatedPurchase.state){
      this._notifyStateUpdate(updatedPurchase.client.phoneNumber, updatedPurchase.state)
    }

    return updatedPurchase
  }  

  _validateUpdate(oldPurchase, newPurchase){
    const itemsChanged = JSON.stringify(oldPurchase.items) != JSON.stringify(newPurchase.items)

    if(itemsChanged && oldPurchase.state != PurchaseStates.Recibido){
      throw new InvalidRequestError("Error de modificación", "No se pueden modificar los ítems de un pedido con estado: " + oldPurchase.state);
    }

  }

  _createPdf(purchase) {
    const purchasePdfCreator = new PurchasePdfCreator(purchase)
    const creator = new PdfCreator(purchasePdfCreator)
    creator.create() 
  }

  _notifyStateUpdate(phone, state){
    const message = new TwilioMessage(phone, "El estado del pedido es " + state)
    const twilio = new TwilioSender(message)
    const notificator = new NotificationSender(twilio)
    notificator.send()
  }

  static checkPurchase(purchase) {
    try {
      Purchase.validate(purchase)
    } catch (error) {
      throw new InvalidRequestError("El pedido no tiene un formato válido", error);
    }
  }

}
export default PurchasesApi
