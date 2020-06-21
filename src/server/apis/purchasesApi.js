import Purchase from "../model/Purchase.js"
import PurchasePdfCreator from "../pdf/PurchasePdfCreator.js"
import PdfCreator from "../pdf/PdfCreator.js"
import InvalidRequestError from "../errors/invalidRequestError.js"
import PurchasesDAOFactory from "../data/purchase/daoFactory.js"
import PurchaseStates from "../enums/PurchaseStates.js"

class PurchasesApi {
  constructor(notificator) {
    this.dao = PurchasesDAOFactory.getDao()
    this.notificator = notificator
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

  _createPdf(purchase) {
    const purchasePdfCreator = new PurchasePdfCreator(purchase)
    const creator = new PdfCreator(purchasePdfCreator)
    creator.create() 
  }

  _notifyStateUpdate(phone, state){
    notificator.send(phone, "El estado del pedido es " + state)
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
