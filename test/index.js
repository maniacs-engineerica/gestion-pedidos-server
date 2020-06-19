import fs from 'fs';
import path from 'path';

import PurchasesApi from "../src/server/apis/purchasesApi.js"
import ProductsApi from "../src/server/apis/productsApi.js"

// testAddPurchase()

// testProductUpdate()







function testProductUpdate(){
  const api = new ProductsApi()
  const product = {
    id: 0,
    name: "Torta de chocolinas",
    price: 55,
    image: fs.createReadStream(path.resolve() + "/test/files/13.png")
  }

  api.update(product)
    .then(() => console.log("Producto modificado"))
    .catch(e => console.log(e))
}

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
