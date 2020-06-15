import AbstractCreator from "./AbstractCreator.js"

export default class PurchasePdfCreator extends AbstractCreator {
  constructor(purchase){
    super()
    this.purchase = purchase
  }

  create(){

    // const builder = new PdfBuilder("path/to/file.pdf");
    // builder.setTitle("Pedido de Matias Cohen");
    // builder.setDescription("Fecha: 10/11/2020")
    // builder.setColumns(["Cantidad", "Producto", "Importe"])
    
    // const row1 = [2, "Torta", 20];
    // const row2 = [1, "Pan Dulce", 40];
    // builder.setRows([row1, row2])
    
    // builder.setFooter("Importe total: $300");
    
    // const pdf = builder.create()

    console.log("PDF de pedido creado");
  }

}