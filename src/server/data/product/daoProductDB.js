import DbClientFactory from "../../db/DbClientFactory.js"
import DaoError from "../../errors/daoError.js"
import InvalidFormatError from "../../errors/invalidFormatError.js"
import ProductsDao from "./daoProducts.js"
import CustomError from "../../errors/CustomError.js"



class ProductsDaoDB extends ProductsDao {

    constructor(){
        super()
        this.dbcliente = DbClientFactory.getDbClient()
    }

    async getById(id) {
        let buscado
        try{
            const db = await this.dbcliente.getDb()
            const products = await db.collection('products')  //Agregar al config         
            buscado = await products.findOne({id: id})    
        }
        catch(err){
            throw new DaoError("Error al obtener los datos", err)
        }

        if(!buscado){
            throw new InvalidFormatError("No se encontro el producto", id)
        }

        return buscado
      }

    async getAll(){

        try {
            const db = await this.dbcliente.getDb()
            const collection = await db.collection('products')
            const products = collection.find().toArray()
            return products
        } catch(err){
           throw new CustomError(500, 'error al obtener todos los productos') 
        }
    }

    async add(product){
        let result
        try{
            const db = await this.dbcliente.getDb()
            const collection = await db.collection('products')
            result = await collection.findOneAndUpdate({ id: product.id }, {$setOnInsert: product}, {upsert: true})
            console.log(result)
            
        } catch(err){
            throw new CustomError(500, 'error al insertar el producto', err)
        }
        
        if( result.nModified == 0 ){
            throw new CustomError(400, 'ya existe un prodcuto con ese id', {id: product.id})
        }
        return result

    }

    async update(product){        
        let result
        try{
            const db = await this.dbcliente.getDb()
            const collection = await db.collection('products')            
            result = await collection.findOneAndReplace({ id: product.id }, product, { projection: { _id: 0}})
        } catch(err){
            throw new CustomError(500, 'error al modificar el producto', err)
        }

        if (!result.ok != 1) {
                throw new CustomError(404, `no se encontró producto con id: ${product.id}`)
        }
        
        return result
    }


}
export default ProductsDaoDB