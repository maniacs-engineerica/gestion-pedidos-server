import UsersDaoMemory from "./daoUsersMemory.js"

class UsersDAOFactory {
    static getDao(){
        return new UsersDaoMemory();
    }
}

export default UsersDAOFactory