import ProductsDAOFactory from "../data/product/daoFactory.js";
import ProductUpdate from "../features/products/ProductUpdate.js";
import ProductGet from "../features/products/ProductGet.js"

class ProductsApi {
  constructor() {
    this.dao = ProductsDAOFactory.getDao()
  }

  async get(queryParams){
    const get = new ProductGet(this.dao)
    const products = await get.run(queryParams)
    return products
  }

  async update(product) {
    const update = new ProductUpdate(this.dao)
    await update.run(product)
  }

}
export default ProductsApi
