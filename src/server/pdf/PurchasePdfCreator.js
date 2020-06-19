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
  constructor(purchase) {
    super()
    this.purchase = purchase
  }

  create() {
    const path = config.purchasesPdfUrl
    fs.mkdirSync(path, { recursive: true });

    const builder = new PdfBuilder(`${path}/Pedido ${this.purchase.id}.pdf`)
      .setTitle(`Pedido de ${this.purchase.client.name}`)
      .setDescription(`Fecha: ${new Date(this.purchase.date).toUTCString()}`)
      .setColumns(COLUMNS)
      .setFooter(`Importe total: $${this.purchase.total}`);

    const rows = this.purchase.items.map(item => {
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