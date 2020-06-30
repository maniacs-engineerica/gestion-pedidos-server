import UsersDaoMemory from "./daoUsersMemory.js"
import UsersDaoDB from "./daoUsersDB.js"
import config from "../../../../config.js"

class UsersDAOFactory {
    static getDao(){
        switch(config.mode){
            case 'db' : return new UsersDaoDB();
            case 'cache' : return new UsersDaoMemory();
        default: throw "invalid mode. check system config!"
        }
    }
}

export default UsersDAOFactory