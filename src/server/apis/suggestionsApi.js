import ProductsDAOFactory from "../data/product/daoFactory"
import UsersDAOFactory from "../data/user/daoFactory"
import SuggestionsGet  from "../features/suggestions/SuggestionsGet.js"

class SuggestionsApi{
    constructor(){
        this.productsDao = ProductsDAOFactory.getDao();
        this.usersDao = UsersDAOFactory.getDao();
    }

    async get(queryParams){
        const get = new SuggestionsGet(this.usersDao, this.productsDao)
        const suggestions = await get.run(queryParams)
        return suggestions
    }
}