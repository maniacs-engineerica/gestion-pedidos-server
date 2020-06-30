import UsersDaoMemory from "./daoUsersMemory.js"
import UsersDaoDB from "./daoUsersDB.js"

class UsersDAOFactory {
    static getDao(){
        //switch(Config.mode){
        switch('memory') {     
            case 'testdb' : return new UsersDaoDB();
            case 'memory' : return new UsersDaoMemory();
        default: throw "invalid mode. check system config!"
        }
    }
}

export default UsersDAOFactory