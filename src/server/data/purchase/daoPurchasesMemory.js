import PurchasesDao from './daoPurchases.js'
import UsersDaoMemory from './daoUsersMemory.js';
import ProductsDaoMemory from './daoProductsMemory.js';
import DaoError from '../../errors/daoError.js';

class PurchasesDaoMemory extends PurchasesDao {
  constructor() {
    super()
    this.usersDao = new UsersDaoMemory()
    this.productsDao = new ProductsDaoMemory()
    this.purchases = []
    this.proxId = 0
  }

  async add(purchase) {
    await this.usersDao.getById(purchase.client)
    await this.checkProducts(purchase)

    purchase.id = this.proxId++;

    this.purchases.push(purchase)

    const newPurchase = await this.getById(purchase.id)
    return newPurchase
  }

  async getById(id) {
    const purchase = this.purchases.find(p => p.id == id)
    if (!purchase) {
      throw new DaoError("pedido no existente", `no se encontró un pedidp para el id: ${id}`)
    }

    await this.fillPurchaseData(purchase)

    return purchase;
  }

  async fillPurchaseData(purchase) {
    purchase.client = await this.usersDao.getById(purchase.client)
    await this.fillPurchaseItemsData(purchase.items)
    purchase.total = purchase.items.reduce((prev, curr) => prev += curr.quantity * curr.product.price , 0)
  }

  async fillPurchaseItemsData(items) {
    const ids = items.map(i => i.product)
    const products = await this.productsDao.getByIds(ids)

    items.forEach(item => {
      item.product = products.find(p => p.id == item.product)
    })
  }

  async update(id, purchase) {
    console.log("Pedido actualizado")
  }

  async checkProducts(purchase) {
    const ids = purchase.items.map(i => i.product)
    const products = await this.productsDao.getByIds(ids)

    if (products.length != ids.length) {
      const productsIds = products.map(p => p.id)
      const invalidId = ids.find(id => !productsIds.includes(id))
      throw new DaoError("producto inválido", `el item con id de producto: ${invalidId} no existe`);
    }
  }

}
export default PurchasesDaoMemory
