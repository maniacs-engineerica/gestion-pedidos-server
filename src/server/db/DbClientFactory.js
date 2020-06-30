import MyMongoClient from './MyMongoClient.js'
import NullDbClient from './NullDbClient.js'
import config from "../../../config.js"

let mongoClient = null

function getMongoClient() {
    if (!mongoClient) {
        mongoClient = new MyMongoClient()
    }
    return mongoClient
}

function getNullDbClient() {
    return new NullDbClient()
}

class DbClientFactory {
    static getDbClient() {
        switch (config.db.client) {        
            case 'mongodb': return getMongoClient()
            default: return getNullDbClient()
        }
    }
}

export default DbClientFactory