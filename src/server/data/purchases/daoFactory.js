import PurchasesDaoMemory from "./daoPurchasesMemory.js"


class PurchasesDAOFactory {
  static getDao() {
      return new PurchasesDaoMemory()
  }
}

export default PurchasesDAOFactory