import ProductsDaoMemory from "./daoProductsMemory.js"
import ProductsDaoDB from "./daoProductDB.js"

class ProductsDAOFactory {
  static getDao() {
    //switch(Config.mode){
      switch('testdb'){
        case 'testdb': return new ProductsDaoDB()
        case 'testMemory': return new ProductsDaoMemory()
        default: throw "invalid mode. check system config!"
    }
  }
}

export default ProductsDAOFactory