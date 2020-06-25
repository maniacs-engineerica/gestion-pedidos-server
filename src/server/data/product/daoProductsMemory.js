import ProductsDao from "./daoProducts.js";
import DaoError from "../../errors/daoError.js";

const products = [
  {
    id: 0,
    name: "Tora de chocolinas",
    price: 40,
    bizcocho: {
            vainilla: false,
            chocolate: false
        },
        peso_gr: 1500,
        capas : 2,
        relleno : {
            ddl : true,
            nutella : false,
            crema : false,
            merengue: false,
            frutos_secos: false,
            frutas : false
        },
        cubierta: {
            chocolate: true,
            crema_chantilly: false,
            fondant: false,
            merengue: false
        }
  },
  {
    id: 1,
    name: "Budín",
    price: 25,
    bizcocho: {
      vainilla: true,
      chocolate: false
    },
    peso_gr: 1500,
    capas : 2,
    relleno : {
      ddl : false,
      nutella : false,
      crema : false,
      merengue: false,
      frutos_secos: false,
      frutas : false
    },
    cubierta: {
      chocolate: false,
      crema_chantilly: false,
      fondant: false,
      merengue: false
    }
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

  async add(product){
    product.id = this.products.length
    this.products.push(product)
    return product
  }

  async update(product){
    const index = this.products.findIndex(p => p.id == product.id)
    if (index < 0){
      throw new DaoError("No se puede actualizar", `El producto con id: ${product.id} no existe`)
    }
    this.products.splice(index, 1, product)
  }

  async getAll(){
    return this.products
  }

}
export default ProductsDaoMemory
