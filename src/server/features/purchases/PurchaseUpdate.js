import InvalidRequestError from '../../errors/InvalidRequestError.js'
import PurchaseStatesEnum from '../../enums/PurchaseStates.js'

export default class PurchaseUpdate {
    constructor(dao, notificator, validator){
        this.dao = dao
        this.notificator = notificator
        this.purchaseValidator = validator
    }

    async run(id, purchase){
        this.purchaseValidator.validate(purchase)

        const oldPurchase = await this.dao.getById(id)
        this._validateUpdate(oldPurchase, purchase)

        const updatedPurchase = await this.dao.update(id, purchase)

        if(oldPurchase.state != updatedPurchase.state){
        this.notificator.send(updatedPurchase.client.phoneNumber, updatedPurchase.state)
        }

        return updatedPurchase
    }

    _validateUpdate(oldPurchase, newPurchase){
        const itemsChanged = JSON.stringify(oldPurchase.items) != JSON.stringify(newPurchase.items)
    
        if(itemsChanged && oldPurchase.state != PurchaseStatesEnum.Recibido){
          throw new InvalidRequestError("Error de modificación", "No se pueden modificar los ítems de un pedido con estado: " + oldPurchase.state);
        }
      }

}