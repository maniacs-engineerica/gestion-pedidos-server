export default class ProductDelete{
    constructor(dao){
        this.dao=dao;
    }
      async deleteProduct(id) {
        await  this.dao.deleteProduct(id)
      }
    }