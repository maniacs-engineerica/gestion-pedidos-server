import PurchasesDAOFactory from "../data/purchase/daoFactory.js"
import Purchase from "../model/Purchase.js"
import NotificationSender from "../notification/NotificationSender.js"
import TwilioSender, { TwilioMessage } from "../notification/TwilioSender.js"
import PurchasePdfCreator from "../pdf/PurchasePdfCreator.js"
import PdfCreator from "../pdf/PdfCreator.js"
import InvalidRequestError from "../errors/invalidRequestError.js"

class PurchasesApi {
  constructor() {
    this.dao = PurchasesDAOFactory.getDao()
  }

  async add(purchase) {
    PurchasesApi.checkPurchase(purchase)

    purchase.state = "Recibido";
    purchase.date = new Date().toISOString()

    const newPurchase = await this.dao.add(purchase)

    this.createPdf(newPurchase)
    this.sendNotification(newPurchase.client, newPurchase.state)

    return newPurchase
  }

  async update(id, purchase) {
    Purchase.validate(purchase)
    await this.dao.update(id, purchase)
  }

  async updatePurchaseState(id, purchase, state) {
    await this.update(id, purchase)
    const message = new TwilioMessage("11-5795-6323", "El estado del pedido es " + state)
    const twilio = new TwilioSender(message)
    const notificator = new NotificationSender(twilio)
    notificator.send()
  }

  createPdf(purchase) {
    const purchasePdfCreator = new PurchasePdfCreator(purchase)
    const creator = new PdfCreator(purchasePdfCreator)
    creator.create()
  }

  sendNotification(client, state){
    const message = new TwilioMessage(client.phoneNumber, `El estado del pedido es '${state}'`)
    const twilio = new TwilioSender(message)
    const notificator = new NotificationSender(twilio)
    notificator.send()
  }

  static checkPurchase(purchase) {
    try {
      Purchase.validate(purchase)
    } catch (error) {
      throw new InvalidRequestError("El pedido no tiene un formato válido", error);
    }
  }

}
export default PurchasesApi
