import ProductsDaoMemory from "./daoProductsMemory.js"
import ProductsDaoDB from "./daoProductDB.js"
import config from "../../../../config.js"

class ProductsDAOFactory {
  static getDao() {
    //switch(config.mode){      
      switch('db'){      
        case 'db': return new ProductsDaoDB()
        case 'cache': return new ProductsDaoMemory()
        default: throw "invalid mode. check system config!"
    }

  }
}

export default ProductsDAOFactory