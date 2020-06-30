import InvalidRequestError  from "../../errors/invalidRequestError.js";

export default class PurchaseGet {
    constructor(dao){
        this.dao = dao
    }

    async run(queryParams){
        let purchases

        if(queryParams.size == 0) {
            purchases = await this.dao.getAll()
        } else if (queryParams.has('id')) {
             purchases = await this.dao.getById(queryParams.get('id'))
        } else {
            throw new InvalidRequestError("Parámetros de búsqueda inválidos", "No se encontró " + queryParams)
        }    

    return purchases
    }
}
