import InvalidRequestError  from "../../errors/invalidRequestError.js";


export default class SuggestionsGet{
    constructor(usersDao,productDao){
        this.usersDao = usersDao;
        this.productDao = productDao;        
    }

    async run(queryParams){

        let products
        let user
        let suggestions
        console.log("query params")
        console.log(queryParams.has("id"))
        if(queryParams.has("id"))
        { 
            user = await this.usersDao.getById(queryParams.id)
        } 
        else { 
            throw new InvalidRequestError("Parámetros de búsqueda inválidos", "No  se encontró el cliente" + queryParams)
        }

        //user = await this.usersDao.getById(0)        
        products = await this.productDao.getAll()   
        
        suggestions = await this._getSuggestions(user, products)
        if(suggestions == "") {
           throw "No se econtraron sugerencias para usuario"
        }
        return suggestions        
    }

    

_getSuggestions(user, products){        
    let suggestions = this._getCakesSuggestions(user, products)
    return suggestions
}

_getCakesSuggestions(user, products){      
    
    let sugerencias = products.filter(function(item) {
        if( this._comparacionRelleno(item,user.preferences) ||
            this._comparacionBizcocho(item,user.preferences) ||
            this._comparacionCubierta(item,user.preferences) 
         ){
            return true    
        }
        else {return false}
    }, this
    )
    return sugerencias
} 


_comparacionRelleno(item,user_preferences){       
    
    for (const key in user_preferences[0].relleno) {
        if (user_preferences[0].relleno[key] == true) {             
            if(item["relleno"][key] == user_preferences[0].relleno[key])
            {
                return true;
            }
        }        
    } 
    return false;    
}

_comparacionBizcocho(item,user_preferences){
    
    for (const key in user_preferences[0].bizcocho) {
        if (user_preferences[0].bizcocho[key] == true) {
            if(item["bizcocho"][key] == user_preferences[0].bizcocho[key])
            {
                return true;
            }
        }
    } 
    return false;
}

_comparacionCubierta(item,user_preferences) {    
    
    for (const key in user_preferences[0].cubierta) {
        if (user_preferences[0].cubierta[key] == true) { 
            if(item["cubierta"][key] == user_preferences[0].cubierta[key])
            {
                return true;
            }
        }
    }
    return false;
}

}