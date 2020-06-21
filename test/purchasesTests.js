import PurchasesApi from "../src/server/apis/purchasesApi.js"
import NotificationSender from "../src/server/notification/NotificationSender.js"
import TwilioSender from "../src/server/notification/TwilioSender.js"

export function addPurchase() {
  const sender = new TwilioSender()
  const notificator = new NotificationSender(sender)
  const api = new PurchasesApi(notificator)
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
  api.add(purchase)
    .then((p) => console.log(`Pedido agregado: ${JSON.stringify(p)}`))
    .catch(e => console.log(e))
}