import Joi from '@hapi/joi'

class Product {

  static validate(product) {
    const productSchema = Joi.object({
      id: Joi.string().min(1).required(),
      name: Joi.string().min(1).required(),
      image: Joi.any(),
      price: Joi.number().min(0).required(),
      bizcocho : {
        vainilla: Joi.bool(),
        chocolate: Joi.bool()
        },
        peso_gr: Joi.number().integer().min(0),        
        capas : Joi.number().integer().min(0),
      relleno : {
          ddl : Joi.bool(),
          nutella : Joi.bool(),
          crema : Joi.bool(),
          merengue: Joi.bool(),
          frutos_secos: Joi.bool(),
          frutas : Joi.bool()
        },
      cubierta: {
          chocolate: Joi.bool(),
          crema_chantilly: Joi.bool(),
          fondant: Joi.bool(),
          merengue: Joi.bool()
        }
          
    }).options({ stripUnknown: true })

    const { error } = Joi.validate(product, productSchema)
    if (error) {
      throw error
    }
  }

}

export default Product