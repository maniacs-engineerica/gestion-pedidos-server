import InvalidRequestError  from "../../errors/invalidRequestError.js";

export default class ProductGet {
    constructor(dao){
        this.dao = dao
    }

    async run(queryParams){
        let products        
        
        console.log(queryParams.size)
        if(queryParams.size == 0) {
        products = await this.dao.getAll()
        } else if (queryParams.has('id')) {
        products = await this.dao.getById(queryParams.get('id'))
        } else {
        throw new InvalidRequestError("Parámetros de búsqueda inválidos", "No se encontró " + queryParams)
        }    

    return products
    }
}
