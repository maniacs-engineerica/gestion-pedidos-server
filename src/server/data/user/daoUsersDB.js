import UsersDao from './daoUsers.js'
import DbClientFactory from '../../db/DbClientFactory.js'
import DaoError from "../../errors/daoError.js"
import InvalidFormatError from "../../errors/invalidFormatError.js"

class UsersDaoDB extends UsersDao {

    constructor(){
        super()
        this.dbclient = DbClientFactory.getDbClient()
    }

    async getById(id) {
        let buscado
        try{
            const db = await this.dbclient.getDb()
            const user = await db.collection('users')
            buscado = await user.findOne({id: id})   
        }
        catch(err){
            throw new DaoError("Error al obtener los datos", err)
        }

        if(!buscado){
            throw new InvalidFormatError("No se encontro el usuario", id)
        }

        return buscado
      }
}

export default UsersDaoDB