import ProductsDaoMemory from "./daoProductsMemory.js"
import config from "../../../../config.js"


class ProductsDAOFactory {
  static getDao() {
    switch(config.mode){
    case 'cache': return new ProductsDaoMemory()
    default: throw "invalid mode. check system config!"
  }
}
}

export default ProductsDAOFactory