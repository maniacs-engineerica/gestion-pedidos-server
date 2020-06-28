import fs from 'fs';
import path from 'path';

import ProductUpdate from '../src/server/features/products/ProductUpdate.js';
import ProductsDAOFactory from '../src/server/data/product/daoFactory.js';
import ProductGet from '../src/server/features/products/ProductGet.js'
import ProductValidator from '../src/server/validators/ProductValidator.js';
import ImageUploader from '../src/server/uploaders/ImageUploader.js';
import ProductAdd from '../src/server/features/products/ProductAdd.js';

export function addProduct() {
  const product = {
    name: "Torta de chocolinas",
    price: 55,
    image: fs.createReadStream(path.resolve() + "/test/files/13.png")
  }

  const dao = ProductsDAOFactory.getDao()
  const validator = new ProductValidator()
  const uploader = new ImageUploader()
  const add = new ProductAdd(dao, validator, uploader)
  add.run(product)
    .then(() => console.log("Producto agregado"))
    .catch(e => console.log(e))
}

export function updateProduct() {
  const product = {
    id: 0,
    name: "Torta de chocolinas",
    price: 55,
    image: fs.createReadStream(path.resolve() + "/test/files/13.png")
  }

  const dao = ProductsDAOFactory.getDao()
  const validator = new ProductValidator()
  const uploader = new ImageUploader()
  const update = new ProductUpdate(dao, validator, uploader)
  update.run(product)
    .then(() => console.log("Producto modificado"))
    .catch(e => console.log(e))
}

export function getAllProducts() {
  const dao = ProductsDAOFactory.getDao()
  const getAll = new ProductGet(dao)
  const queryParams = new Map()
  getAll.run(queryParams)
    .then((result) => console.log(`Listado de productos: + ${JSON.stringify(result)}`))
    .catch(error => console.log(error))
}