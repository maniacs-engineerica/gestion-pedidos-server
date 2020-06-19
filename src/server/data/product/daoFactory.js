import ProductsDaoMemory from "./daoProductsMemory.js"

class ProductsDAOFactory {
  static getDao() {
      return new ProductsDaoMemory()
  }
}

export default ProductsDAOFactory