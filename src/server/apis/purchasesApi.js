import PurchasesDAOFactory from "../data/purchases/daoFactory.js"
import Purchase from "../model/Purchase.js"

class PurchasesApi {
  constructor() {
    this.dao = PurchasesDAOFactory.getDao()
  }

  async add(purchase) {
    Purchase.validate(purchase)
    await this.dao.add(purchase)
    //Crear y almacenar PDF
    //Llamar al cambio de estado
  }
}
export default PurchasesApi
