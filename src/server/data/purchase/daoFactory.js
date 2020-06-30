import PurchasesDaoMemory from "./daoPurchasesMemory.js"
import PurchasesDaoDB from "./daoPurchaseDB.js"


class PurchasesDAOFactory {
  static getDao() {
    //switch(Config.mode){
    switch('testdb'){
      case 'testdb' : return new PurchasesDaoDB()
      case 'memory': return new PurchasesDaoMemory()
      default: throw "invalid mode. check system config!" 

    }
      
  }
}

export default PurchasesDAOFactory