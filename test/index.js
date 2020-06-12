import PurchasesApi from "../src/server/apis/purchasesApi.js"

const api = new PurchasesApi()
api.add({})
  .then(() => console.log("Pedido creado!"))
  .catch(e => console.log(e));