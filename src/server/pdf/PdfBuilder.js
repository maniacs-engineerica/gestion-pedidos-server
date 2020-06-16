import fs from 'fs'
import PDFDocument from 'pdfkit'
import PdfTable from 'voilab-pdf-table'
import FitColumn from "voilab-pdf-table/plugins/fitcolumn.js"

export default class PdfBuilder {

   constructor(path) {
      this.path = path;
      this.doc = new PDFDocument();
      this.table = new PdfTable(this.doc, {
         bottomMargin: 30
      });

      this.table.addPlugin(new FitColumn({
         column: 'description'
      }))
         // set defaults to your columns
         .setColumnsDefaults({
            headerBorder: 'B',
            align: 'right'
         })
   }
   setColumns(columns) {
      this.columns = columns;
      return this;
   }

   setTitle(title) {
      this.title = title;
      return this;
   }
   setDescription(description) {
      this.description = description;
      return this;
   }
   setFooter(footer) {
      this.footer = footer;
      return this;
   }

   setRows(rows) {
      this.rows = rows;
      return this;
   }

   create() {
      // Create a document
      this.doc
         .fontSize(18)
         .text(`${this.title} - ${this.description}`, 100, 100);
      this.doc
         .fontSize(14)
         .text(`                                      `, 100, 100);
      this.table.addColumns(this.columns)
      this.table.addBody(this.rows);
      this.doc.text(this.footer, 20, this.doc.page.height - 50, {
         lineBreak: false,
         aling: 'right',
      });
      this.doc.pipe(fs.createWriteStream(this.path));
      this.doc.end();
      
      return this.doc;
   }
}