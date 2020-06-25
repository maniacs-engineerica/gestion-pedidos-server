export default class ProductAdd {
  constructor(dao, validator, imageUploader) {
    this.dao = dao
    this.validator = validator
    this.uploader = imageUploader
  }

  async run(product) {
    this.validator.validate(product)

    if (product.image) {
      product.imageName = await this.uploader.upload(product.image)
    }

    const newProduct = await this.dao.add(product)

    return newProduct
  }
}