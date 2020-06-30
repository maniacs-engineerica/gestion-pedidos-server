import DaoError from '../errors/daoError.js'
import DbClient from './DbClient.js'

class NullDbClient extends DbClient {

    constructor() {
        super()
    }

    async connect() {
    }

    async disconnect() {
    }

    async getClient() {
        throw new DaoError( "no se ha configurado ningun cliente de bd para conectarse", true)
    }

    async getDb() {
        throw new DaoError("no se ha configurado ningun cliente de bd para conectarse", true)
    }
}

export default NullDbClient