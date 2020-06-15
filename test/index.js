import PurchasesApi from "../src/server/apis/purchasesApi.js"

const api = new PurchasesApi()
api.add({})
  .then(() => console.log("Test creacion pedido finalizado!"))
  .catch(e => console.log(e));