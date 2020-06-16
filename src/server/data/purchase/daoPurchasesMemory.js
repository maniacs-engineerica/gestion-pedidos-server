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

}
export default PurchasesDaoMemory
