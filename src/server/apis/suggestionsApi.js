import ProductsDAOFactory from "../data/product/daoFactory"
import UsersDAOFactory from "../data/user/daoFactory"
import SuggestionsGet  from "../features/suggestions/SuggestionsGet.js"
import SuggestionsNotificationSender from "../features/suggestions/SuggestionsNotificationSender.js"

class SuggestionsApi{
    constructor(){
        this.productsDao = ProductsDAOFactory.getDao();
        this.usersDao = UsersDAOFactory.getDao();
        this.notificator = new SuggestionsNotificationSender(new TwilioSender(config.twilio))
    }

    async get(queryParams){
        const get = new SuggestionsGet(this.usersDao, this.productsDao, this.notificator)
        const suggestions = await get.run(queryParams)
        return suggestions
    }
}