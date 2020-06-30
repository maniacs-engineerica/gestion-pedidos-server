import MyMongoClient from './MyMongoClient.js'
import NullDbClient from './NullDbClient.js'
//import Config from '../../../config.js'

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
        //switch (Config.db.client) {
        switch ('mongodb') {
            case 'mongodb': return getMongoClient()
            default: return getNullDbClient()
        }
    }
}

export default DbClientFactory