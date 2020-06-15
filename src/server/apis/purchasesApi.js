import PurchasesDAOFactory from "../data/purchase/daoFactory.js"
import Purchase from "../model/Purchase.js"
import NotificationSender from "../notification/NotificationSender.js"
import TwilioSender, { TwilioMessage } from "../notification/TwilioSender.js"
import PurchasePdfCreator from "../pdf/PurchasePdfCreator.js"
import PdfCreator from "../pdf/PdfCreator.js"

class PurchasesApi {
  constructor() {
    this.dao = PurchasesDAOFactory.getDao()
  }

  async add(purchase) {
    Purchase.validate(purchase)
    await this.dao.add(purchase)
    
    //Crear y almacenar PDF
    const purchasePdfCreator = new PurchasePdfCreator(purchase)
    const creator = new PdfCreator(purchasePdfCreator)
    const pdf = creator.create() 

    //Llamar al cambio de estado
    const message = new TwilioMessage("11-5795-6323", "El estado del pedido es 'Recibido'")
    const twilio = new TwilioSender(message)
    const notificator = new NotificationSender(twilio)
    notificator.send()
  }

}
export default PurchasesApi
