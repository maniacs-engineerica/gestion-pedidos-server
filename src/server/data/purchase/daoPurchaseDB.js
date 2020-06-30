import PurchasesDao from "./daoPurchases.js"
import DbClientFactory from "../../db/DbClientFactory.js"


class PurchasesDaoDB extends PurchasesDao {

    constructor(){
        super()
        this.dbcliente = DbClientFactory.getDbClient()
    }

    async getAll(){

        try {
            const db = await this.dbcliente.getDb()
            const collection = await db.collection('purchases')
            const products = collection.find().toArray()
            return products
        } catch(err){
           throw new CustomError(500, 'error al obtener todos los pedidos') 
        }
    }

    async getById(id) {
        let buscado
        try{
            const db = await this.dbcliente.getDb()
            const products = await db.collection('purchases')  //Agregar al config         
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

      async add(purchase){
        let result
        try{
            const db = await this.dbcliente.getDb()
            const collection = await db.collection('purchase')
            result = await collection.findOneAndUpdate({ id: purchase.id }, {$setOnInsert: product}, {upsert: true})
            console.log(result)
            
        } catch(err){
            throw new CustomError(500, 'error al insertar el pedido', err)
        }
        
        if( result.nModified == 0 ){
            throw new CustomError(400, 'ya existe un pedido con ese id', {id: product.id})
        }
        return result

    }

      async update(id, purchase){
        console.log("Entre a PURCHASE UPDATE")
        let result
        try{
            const db = await this.dbcliente.getDb()
            const collection = await db.collection('purchases')
            
            result = await collection.findOneAndReplace({ id: id }, purchase, { projection: { _id: 0}})
            console.log("result")
            console.log(result)
            
        } catch(err){
            throw new CustomError(500, 'error al modificar el pedido', err)
        }
        
        if (!result.ok != 1) {
                throw new CustomError(404, `no se encontró pedido con id: ${purchase.id}`)
        }
        
        return result

    }

    async add(purchases){
        const db = await this.dbcliente.getDbClient()
        const users = await db.collection('users')


    }




}

export default PurchasesDaoDB