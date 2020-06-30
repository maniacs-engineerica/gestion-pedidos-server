import PurchasesDao from "./daoPurchases.js"
import DbClientFactory from "../../db/DbClientFactory.js"
import DaoError from "../../errors/daoError.js"
import InvalidRequestError from "../../errors/invalidRequestError.js"
import InvalidFormatError from "../../errors/invalidFormatError.js"

class PurchasesDaoDB extends PurchasesDao {

    constructor(){
        super()
        this.dbcliente = DbClientFactory.getDbClient()
    }

    
    async add(purchase){
        let result
        try {                     
            const db = await this.dbcliente.getDb()
            const collection = await db.collection('purchases')                    
            result = await collection.findOneAndUpdate({ id: purchase.id }, {$setOnInsert: purchase}, {upsert: true})            

        } catch(err){
        throw new DaoError('error al insertar el pedido', err)
        }
    
        if( result.nModified == 0 ){
            throw new InvalidRequestError("No agregado",'ya existe un pedido con ese id', {id: product.id})
        }

        console.log(result.name)
        return result
    }

    
    async update(id, purchase){        
        let result
        try{
            const db = await this.dbcliente.getDb()
            const collection = await db.collection('purchases')            
            result = await collection.findOneAndReplace({ id: id }, purchase, { projection: { _id: 0}})
            
        } catch(err){
            throw new DaoError('error al modificar el pedido', err)
        }
        
        if (result.ok != 1) {
                throw new InvalidFormatError("No encontrado",`no se encontró pedido con id: ${purchase.id}`)
        }        
        return result
    }


    async getAll(){

        try {            
            const db = await this.dbcliente.getDb()
            const collection = await db.collection('purchases')
            const products = collection.find().toArray()
            return products
        } catch(err){
           throw new DaoError(500, 'error al obtener todos los pedidos') 
        }
    }

    async getById(id) {
        let buscado
        try{
            const db = await this.dbcliente.getDb()
            const products = await db.collection('purchases')
            buscado = await products.findOne({id: id})    
        }
        catch(err){
            throw new DaoError("Error al obtener los datos", err)
        }

        if(!buscado){
            throw new InvalidFormatError("No se encontro el pedido", id)
        }

        return buscado
      }


    async fillPurchaseData(purchase) {
        const db = await this.dbcliente.getDb()
        const userCollection = await db.collection('users')        
        purchase.client = await this.usersDao.getById(purchase.client)
        await this.fillPurchaseItemsData(purchase.items)
        purchase.total = purchase.items.reduce((prev, curr) => prev += curr.quantity * curr.product.price , 0)
      }

    
    async fillPurchaseItemsData(items) {
        const ids = items.map(i => i.product)
        const products = await this.productsDao.getByIds(ids)

        items.forEach(item => {
            item.product = products.find(p => p.id == item.product)
        })
    }
    
    
    async checkProducts(purchase) {
        const ids = purchase.items.map(i => i.product)
        const products = await this.productsDao.getByIds(ids)

    if (products.length != ids.length) {
      const productsIds = products.map(p => p.id)
      const invalidId = ids.find(id => !productsIds.includes(id))
      throw new DaoError("producto inválido", `el item con id de producto: ${invalidId} no existe`);
    }
  }  
    
    async deletePurchase(id) {
        await this.getById(id)
        this.purchases = this.purchases.filter(purchase => purchase.id !== id)
        return this.purchases
    }
}

export default PurchasesDaoDB