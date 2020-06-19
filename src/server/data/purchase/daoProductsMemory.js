import ProductsDao from "./daoProducts.js";

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

}
export default ProductsDaoMemory
