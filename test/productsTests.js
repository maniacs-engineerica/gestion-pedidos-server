import fs from 'fs';
import path from 'path';

import ProductsApi from "../src/server/apis/productsApi.js"

export function updateProduct(){
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