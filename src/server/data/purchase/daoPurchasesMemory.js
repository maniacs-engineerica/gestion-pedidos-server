import PurchasesDao from './daoPurchases.js'

class PurchasesDaoMemory extends PurchasesDao {
  constructor(){
    super()
    this.purchases = [];
  }

async add(purchase){
  purchase.id = "12345678";
  console.log("Pedido almacenado")
}

async update(id, purchase) {
  console.log("Pedido actualizado")
}

async getById(id){
  
}

}
export default PurchasesDaoMemory
