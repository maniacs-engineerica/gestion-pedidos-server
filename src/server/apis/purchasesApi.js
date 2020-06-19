
import Purchase from "../model/Purchase.js"
import NotificationSender from "../notification/NotificationSender.js"
import TwilioSender, { TwilioMessage } from "../notification/TwilioSender.js"
import PurchasePdfCreator from "../pdf/PurchasePdfCreator.js"
import PdfCreator from "../pdf/PdfCreator.js"
import InvalidRequestError from "../errors/invalidRequestError.js"
import PurchasesDAOFactory from "../data/purchase/daoFactory.js"

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
    Purchase.validate(purchase)
    const stateChanged = await this._stateChanged(id, purchase)
    await this.dao.update(id, purchase)
    if(stateChanged){
      this._notifyStateUpdate("+541157956323", purchase.state)
    }
  }

  async updatePurchaseState(id, purchase, state) {
    await this.update(id, purchase)
    const message = new TwilioMessage("11-5795-6323", "El estado del pedido es " + state)
    const twilio = new TwilioSender(message)
    const notificator = new NotificationSender(twilio)
    notificator.send()
  }

  async _stateChanged(id, newPurchase){
    const oldPurchase = await this.dao.getById(id)
    return oldPurchase.state != newPurchase.state
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
