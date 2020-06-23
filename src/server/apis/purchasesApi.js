import PurchasesDAOFactory from "../data/purchase/daoFactory.js"
import config from "../../../config.js"
import PurchaseNotificationSender from "../features/purchases/PurchaseNotificationSender.js"
import PurchaseAdd from "../features/purchases/PurchaseAdd.js"
import PdfCreator from "../pdf/PdfCreator.js"
import PurchasePdfCreator from "../pdf/PurchasePdfCreator.js"
import TwilioSender from "../notification/TwilioSender.js"
import PurchaseGet from "../features/purchases/PurchaseGet.js"
import PurchaseUpdate from "../features/purchases/PurchaseUpdate.js"
import PurchaseValidator from '../validators/PurchaseValidator.js'

class PurchasesApi {
  constructor() {
    this.dao = PurchasesDAOFactory.getDao()
    this.notificator = new PurchaseNotificationSender(new TwilioSender(config.twilio))
    this.pdfCreator = new PdfCreator(new PurchasePdfCreator())
    this.validator = new PurchaseValidator()
  }

  async add(purchase) {
    const add = new PurchaseAdd(this.dao, this.pdfCreator, this.notificator, this.validator)
    const newPurchase = await add.run(purchase)
    return newPurchase
  }

  async update(id, purchase) {
    const update = new PurchaseUpdate(this.dao, this.notificator, this.validator)
    const updatedPurchase = await update.run(id, purchase)
    return updatedPurchase
  }  

  async get(queryParams){
    const get = new PurchaseGet(this.dao)
    const purchases = await get.run(queryParams)
    return purchases
  }

}
export default PurchasesApi
