import UsersDao from "./daoUsers.js";
import DaoError from "../../errors/daoError.js";

const users = [
  {
    id: 0,
    name: "Matias Cohen",
    phoneNumber: "1157956323"
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
