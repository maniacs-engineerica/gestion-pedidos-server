/* eslint-disable no-console */
//import Config from '../../../config.js'
import CustomError from '../errors/CustomError.js'
import mongodb from 'mongodb'
import DbClient from './DbClient.js'
 

const { MongoClient } = mongodb

class MyMongoClient extends DbClient {
    constructor() {
        super()
        this.connected = false
        /*this.client = new MongoClient(Config.db.cnxStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })*/
        this.client = new MongoClient("mongodb+srv://ivanbort:ivanbort@cluster0-ylkjr.mongodb.net/pasteleria?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    async connect() {
        try {
            await this.client.connect()
        } catch (error) {
            throw new CustomError(500, 'error al conectarse a mongodb', error)
        }
    }

    async disconnect() {
        try {
            await this.client.close()
            this.connected = false
        } catch (error) {
            throw new CustomError(500, 'error al conectarse a mongodb', error)
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
            throw new CustomError(500, 'error al conectarse a mongodb', error)
        }
        if (!db) {
            throw new CustomError(500, 'error al obtener la base de datos', true)
        }
        return db
    }
}

export default MyMongoClient