import ProductsDAOFactory from "../data/product/daoFactory.js";
import Product from "../model/Product.js";
import InvalidRequestError from "../errors/invalidRequestError.js";
import config from "../../../config.js";
import request from 'request-promise-native'
import FileError from "../errors/fileError.js";

class ProductsApi {
  constructor() {
    this.dao = ProductsDAOFactory.getDao()
  }

  async update(product) {
    ProductsApi.checkProduct(product)

    if (product.image) {
      product.imageName = await this.uploadImage(product.image)
    }

    await this.dao.update(product)

    return product
  }

  async uploadImage(stream) {
    const data = {
      method: "POST",
      url: `${config.fileStorageUrl}api/files/input`,
      formData: { image: stream }
    }
    try {
      const response = await request(data)
      const imageName = JSON.parse(response).filename
      return imageName
    } catch (error){
      throw new FileError("error al subir la imagen", error.message)
    }
  }

  static checkProduct(product) {
    try {
      Product.validate(product)
    } catch (error) {
      throw new InvalidRequestError("El producto no tiene un formato válido", error);
    }
  }

}
export default ProductsApi
