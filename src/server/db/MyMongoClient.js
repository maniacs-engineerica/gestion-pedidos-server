/* eslint-disable no-console */
import config from "../../../config.js"
import mongodb from 'mongodb'
import DbClient from './DbClient.js'
import DaoError from "../errors/daoError.js"

const { MongoClient } = mongodb

class MyMongoClient extends DbClient {
    constructor() {
        super()
        this.connected = false        
        this.client = new MongoClient(config.db.cnxStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })       
    }

    async connect() {
        try {
            await this.client.connect()
        } catch (error) {
            throw new DaoError('error al conectarse a mongodb', error)
        }
    }

    async disconnect() {
        try {
            await this.client.close()
            this.connected = false
        } catch (error) {
            throw new DaoError('error al conectarse a mongodb', error)
        }
    }

    async _getClient() {
        if (!this.connected) {
            await this.connect()
            this.connected = true
        }
        return this.client
    }

    async getDb() {
        let db
        try {
            const client = await this._getClient()
            db = client.db('pasteleria')
        } catch (error) {
            throw new DaoError('error al conectarse a mongodb', error)
        }
        if (!db) {
            throw new DaoError('error al obtener la base de datos', true)
        }
        return db
    }
}

export default MyMongoClient