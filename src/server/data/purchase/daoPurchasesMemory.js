import PurchasesDao from './daoPurchases.js'

class PurchasesDaoMemory extends PurchasesDao {
  constructor(){
    super()
    this.purchases = [];
  }

async add(purchase){
  console.log("Pedido almacenado")
}

}
export default PurchasesDaoMemory
