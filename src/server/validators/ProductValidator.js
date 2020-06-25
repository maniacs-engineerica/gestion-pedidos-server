import AbstractValidator from "./AbstractValidator.js"
import InvalidFormatError from "../errors/invalidFormatError.js";
import Product from "../model/Product.js";

export default class ProductValidator extends AbstractValidator {
  constructor() {
    super()
  }

  validate(product) {
    try {
      Product.validate(product)
    } catch (error) {
      throw new InvalidFormatError("El producto no tiene un formato válido", error);
    }
  }
}