import UsersDao from "./daoUsers.js";
import DaoError from "../../errors/daoError.js";

const users = [
  {
    id: 0,
    name: "Matias Cohen",
    phoneNumber: "1157956323",
    preferences: [{
      bizcocho: {
        vainilla: true,
        chocolate: false
      },
      relleno: {
        ddl : true,        
        nutella: false,
        crema: false,
        merengue: false,
        frutos_secos: false,
        frutas: false
    },
    cubierta: {
      chocolate: true,
      crema_chantilly: false,
      fondant: false,
      merengue: false
    }
  }]  
  },
  {
    id: 1,
    name: "Ivan Blanco",
    phoneNumber: "1135122306",
    preferences: [{
      bizcocho: {
        vainilla: true,
        chocolate: false
      },
      relleno: {
        ddl : true,        
        nutella: false,
        crema: false,
        merengue: false,
        frutos_secos: false,
        frutas: false
    },
    cubierta: {
      chocolate: true,
      crema_chantilly: false,
      fondant: false,
      merengue: false
    }
  }]  
  }
]

class UsersDaoMemory extends UsersDao {
  constructor() {
    super()
    this.users = users;
  }

  async getById(id) {
    const user = this.users.find(u => u.id == id)
    if (!user) {
      throw new DaoError("usuario no existente", `no se encontró un usuario para el id: ${id}`)
    }
    return user
  }

}
export default UsersDaoMemory
