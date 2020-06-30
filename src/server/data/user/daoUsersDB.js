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
            console.log(id)
            console.log(user)
            buscado = await user.findOne({id: id})   
            console.log(buscado)
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