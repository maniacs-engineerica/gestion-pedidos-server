import InvalidRequestError  from "../../errors/invalidRequestError.js";


export default class SuggestionsGet{
    constructor(usersDao,productDao, twilio){
        this.usersDao = usersDao;
        this.productDao = productDao;
        this.notificator = twilio
    }

    async run(queryParams){
         let user 
        if(queryParams.has("id"))
        { 
           user = await this.usersDao.getById(queryParams.get('id'))           
        }
        else { 
            throw new InvalidRequestError("Parámetros de búsqueda inválidos", "No  se encontró el cliente" + queryParams)
        }        
        const products = await this.productDao.getAll()        
        const suggestions = await this._getSuggestions(user, products)
        if(suggestions == "") {
           throw "No se econtraron sugerencias para usuario"
        }
                
        this.notificator.send(user.phoneNumber,suggestions)           
        
        return suggestions
    }

_getSuggestions(user, products){          
    const sugerencias = products.filter(function(item) {
        if( this._leGustaRelleno(item,user.preferences) ||
            this._leGustaBizcocho(item,user.preferences) ||
            this._leGustaCubierta(item,user.preferences) 
         ){
            return true    
        }
        else {return false}
    }, this
    )
    return sugerencias
} 


_leGustaRelleno(item,user_preferences){           
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

_leGustaBizcocho(item,user_preferences){    
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

_leGustaCubierta(item,user_preferences) {    
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