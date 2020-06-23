import AbstractValidator from "./AbstractValidator.js"
import Purchase from "../model/Purchase.js"
import InvalidFormatError from "../errors/invalidFormatError.js";

export default class PurchaseValidator extends AbstractValidator{  
    constructor(){
      super()
    }

    validate(purchase){
        try {
            Purchase.validate(purchase)
          } catch (error) {
            throw new InvalidFormatError("El pedido no tiene un formato válido", error);
          }
    }
}