import ProductsDAOFactory from "../src/server/data/product/daoFactory.js"
import UsersDAOFactory from "../src/server/data/user/daoFactory.js"
import SuggestionsGet  from "../src/server/features/suggestions/SuggestionsGet.js"

export function getSuggestions(){
    const productsDao = ProductsDAOFactory.getDao()
    const usersDao = UsersDAOFactory.getDao()    
    const get = new SuggestionsGet(usersDao, productsDao)
    let map = new Map()
    map.set("id",0)
    const queryParams = map

    get.run(queryParams)
    .then((suggest) => console.log(`Sugerencias encontradas ${JSON.stringify(suggest)}`))
    .catch((error) => console.log(error))

}