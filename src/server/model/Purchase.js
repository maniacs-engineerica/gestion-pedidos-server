import Joi from '@hapi/joi'

class Purchase {

  static validate(purchase) {
    const purchaseSchema = {
      id: Joi.number().integer().min(0),
      client: Joi.number().integer().min(0).required(),
      items: Joi.array().items(Joi.object({
        quantity: Joi.number().integer().min(1).required(),
        product: Joi.number().integer().min(0).required()
      })).min(1).required()
    }

    const { error } = Joi.validate(purchase, purchaseSchema)
    if (error) {
      throw error
    }
  }

}

export default Purchase