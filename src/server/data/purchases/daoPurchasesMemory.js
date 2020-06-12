import PurchasesDao from './daoPurchases.js'

class PurchasesDaoMemory extends PurchasesDao {
  constructor(){
    super()
    this.purchases = [];
  }

async add(purchase){
  
}

}
export default PurchasesDaoMemory
