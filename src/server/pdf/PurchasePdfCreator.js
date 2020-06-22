import AbstractCreator from "./AbstractCreator.js"
import PdfBuilder from "./PdfBuilder.js";
import config from "../../../config.js";
import fs from 'fs'

const COLUMNS = [{
  id: 'description',
  header: 'Producto',
  align: 'left'
},
{
  id: 'quantity',
  header: 'Cantidad',
  width: 120
},
{
  id: 'price',
  header: 'Precio',
  width: 60
},
{
  id: 'total',
  header: 'Importe',
  width: 60
}]

export default class PurchasePdfCreator extends AbstractCreator {
  constructor() {
    super()
  }

  create(purchase) {
    const path = config.purchasesPdfUrl
    fs.mkdirSync(path, { recursive: true });

    const builder = new PdfBuilder(`${path}/Pedido ${purchase.id}.pdf`)
      .setTitle(`Pedido de ${purchase.client.name}`)
      .setDescription(`Fecha: ${new Date(purchase.date).toUTCString()}`)
      .setColumns(COLUMNS)
      .setFooter(`Importe total: $${purchase.total}`);

    const rows = purchase.items.map(item => {
      return {
        description: item.product.name,
        quantity: item.quantity,
        price: `$${item.product.price}`,
        total: `$${item.quantity * item.product.price}`
      }
    })

    builder.setRows(rows).create()

    console.log("PDF de pedido creado");
  }

}