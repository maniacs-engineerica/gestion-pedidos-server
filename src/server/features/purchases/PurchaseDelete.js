export default class PurchaseDelete{
constructor(dao){
    this.dao=dao;
}
  async deletePurchase(id) {
    await  this.dao.deletePurchase(id)
  }
}
