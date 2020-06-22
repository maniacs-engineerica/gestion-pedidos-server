import Purchase from "../model/Purchase.js"
import InvalidRequestError from "../errors/invalidRequestError.js"
import PurchasesDAOFactory from "../data/purchase/daoFactory.js"
import PurchaseStates from "../enums/PurchaseStates.js"
import config from "../../../config.js"
import PurchaseNotificationSender from "../features/purchases/PurchaseNotificationSender.js"
import PurchaseAdd from "../features/purchases/PurchaseAdd.js"
import PdfCreator from "../pdf/PdfCreator.js"
import PurchasePdfCreator from "../pdf/PurchasePdfCreator.js"
import TwilioSender from "../notification/TwilioSender.js"

class PurchasesApi {
  constructor() {
    this.dao = PurchasesDAOFactory.getDao()
    this.sender = new TwilioSender(config.twilio)
    this.pdfCreator = new PdfCreator(new PurchasePdfCreator())
  }

  async add(purchase) {
    const add = new PurchaseAdd(this.dao, this.pdfCreator, this.sender)
    const newPurchase = await add.run(purchase)
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

  async get(queryParams){
    let purchases

    if(queryParams.size == 0) {
      purchases = await this.dao.getAll()
    } else if (queryParams.has('id')) {
      purchases = await this.dao.getById(queryParams.get('id'))
    } else {
      throw new InvalidRequestError("Parámetros de búsqueda inválidos", "No se encontró " + queryParams)
    }    

    return purchases
  }

  _validateUpdate(oldPurchase, newPurchase){
    const itemsChanged = JSON.stringify(oldPurchase.items) != JSON.stringify(newPurchase.items)

    if(itemsChanged && oldPurchase.state != PurchaseStates.Recibido){
      throw new InvalidRequestError("Error de modificación", "No se pueden modificar los ítems de un pedido con estado: " + oldPurchase.state);
    }
  }

  _notifyStateUpdate(phone, state){
    const notificator = new PurchaseNotificationSender(this.sender)
    notificator.send(phone, state)
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
