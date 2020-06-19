import ProductsDao from "./daoProducts.js";
import DaoError from "../../errors/daoError.js";

const products = [
  {
    id: 0,
    name: "Tora de chocolinas",
    price: 40
  },
  {
    id: 1,
    name: "Budín",
    price: 25
  },
]

class ProductsDaoMemory extends ProductsDao {
  constructor() {
    super()
    this.products = products;
  }

  async getByIds(ids) {
    return this.products.filter(p => ids.includes(p.id))
  }

  async update(product){
    const index = this.products.findIndex(p => p.id == product.id)
    if (index < 0){
      throw new DaoError("No se puede actualizar", `El producto con id: ${product.id} no existe`)
    }
    this.products.splice(index, 1, product)
  }

}
export default ProductsDaoMemory
