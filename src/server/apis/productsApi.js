import ProductsDAOFactory from "../data/product/daoFactory.js";
import ProductUpdate from "../features/products/ProductUpdate.js";
import ProductValidator from "../validators/ProductValidator.js";
import ImageUploader from "../uploaders/ImageUploader.js";
import ProductAdd from "../features/products/ProductAdd.js";
import ProductGet from "../features/products/ProductGet.js";
import ProductDelete from "../features/products/ProductDelete.js";

class ProductsApi {
  constructor() {
    this.dao = ProductsDAOFactory.getDao()
    this.validator = new ProductValidator()
    this.uploader = new ImageUploader()
  }

  async add(product) {
    const add = new ProductAdd(this.dao, this.validator, this.uploader)
    const newProduct = await add.run(product)
    return newProduct
  }

  async get(queryParams){
    const get = new ProductGet(this.dao)
    const products = await get.run(queryParams)
    return products
  }

  async update(product) {
    const update = new ProductUpdate(this.dao, this.validator, this.uploader)
    await update.run(product)
  }
  async deleteProduct(id) {
    const deleting = new ProductDelete(this.dao);
    deleting.deleteProduct(id)
  
    }

}
export default ProductsApi
