export default class ProductUpdate {
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

    await this.dao.update(product)

    return product
  }
}