import ProductsDAOFactory from "../data/product/daoFactory.js";
import ProductUpdate from "../features/products/ProductUpdate.js";

class ProductsApi {
  constructor() {
    this.dao = ProductsDAOFactory.getDao()
  }

  async update(product) {
    const update = new ProductUpdate(this.dao)
    await update.run(product)
  }

}
export default ProductsApi
