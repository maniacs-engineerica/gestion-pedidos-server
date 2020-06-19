import Joi from '@hapi/joi'

class Product {

  static validate(product) {
    const productSchema = Joi.object({
      id: Joi.number().integer().min(0),
      name: Joi.string().min(1).required(),
      price: Joi.number().min(0).required(),
    }).options({ stripUnknown: true })

    const { error } = Joi.validate(product, productSchema)
    if (error) {
      throw error
    }
  }

}

export default Product