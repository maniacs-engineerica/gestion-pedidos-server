import PurchasesApi from "../src/server/apis/purchasesApi.js"

const api = new PurchasesApi()

const purchase = {
  date: "10/10/2020",
  client: {
    name: "Matias Cohen"
  },
  total: 1024,
  items: [
    {
      quantity: 2,
      product: {
        name: "Torta de chocolinas"
      },
      price: 40
    },
    {
      quantity: 8,
      product: {
        name: "Budin de vainilla"
      },
      price: 35
    }
  ]
}

api.add(purchase)
  .then(() => console.log("Test creacion pedido finalizado!"))
  .catch(e => console.log(e))