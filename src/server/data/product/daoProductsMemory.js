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
    const product = this.products.filter(p => ids.includes(p.id))

    if (!product) {
      throw new DaoError("producto no existente", `no se encontró un producto para el id: ${ids}`)
    }
    return product
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
  async deleteProducto(id) {
    await this.getByIds(id)
    this.products = this.products.filter(products => products.id !== id)
    return this.products
    }

  async getAll(){
    return this.products
  }

}
export default ProductsDaoMemory
