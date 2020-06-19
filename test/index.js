import PurchasesApi from "../src/server/apis/purchasesApi.js"

testAddPurchase()

function testAddPurchase() {
  const api = new PurchasesApi()
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
