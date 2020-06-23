import PurchaseAdd from "../src/server/features/purchases/PurchaseAdd.js"
import PurchasesDAOFactory from "../src/server/data/purchase/daoFactory.js"
import PdfCreator from "../src/server/pdf/PdfCreator.js"
import PurchasePdfCreator from "../src/server/pdf/PurchasePdfCreator.js"
import TwilioSender from "../src/server/notification/TwilioSender.js"
import config from "../config.js"
import PurchaseValidator from "../src/server/validators/PurchaseValidator.js"

export function addPurchase() {
  const purchase = {
    client: 0,
    items: [
      {
        quantity: 2,
        product: 0
      },
      {
        quantity: 8,
        product: 1
      }
    ]
  }
  const dao = PurchasesDAOFactory.getDao()
  const creator = new PdfCreator(new PurchasePdfCreator())
  const twilio = new TwilioSender(config.twilio)
  const validator = new PurchaseValidator()
  const add = new PurchaseAdd(dao, creator, twilio, validator)
  add.run(purchase)
    .then((p) => console.log(`Pedido agregado: ${JSON.stringify(p)}`))
    .catch(e => console.log(e))
}