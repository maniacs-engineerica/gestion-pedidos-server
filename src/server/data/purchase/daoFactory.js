import PurchasesDaoMemory from "./daoPurchasesMemory.js"
import PurchasesDaoDB from "./daoPurchaseDB.js"
import config from "../../../../config.js"


class PurchasesDAOFactory {
  static getDao() {
    //switch(config.mode){    
      switch('db'){      
      case 'db' : return new PurchasesDaoDB()
      case 'cache': return new PurchasesDaoMemory()
      default: throw "invalid mode. check system config!" 

    }
      
  }
}

export default PurchasesDAOFactory