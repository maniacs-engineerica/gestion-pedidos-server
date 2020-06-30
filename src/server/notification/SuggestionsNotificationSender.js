import SmsServiceError from "../errors/smsServiceError.js"

export default class SuggestionsNotificationSender {
    constructor(sender) {
      this.sender = sender
    }

    send(phone, suggestions) {   
      const mensaje = this._sortMessage(suggestions)      
      try {          
        this.sender.send(phone, mensaje)
      }
      catch (err) {
        throw new SmsServiceError("Falló el envío de sms", "Contenido: " + mensaje + "\n Destinatario: " + phone)
      }
    }

    _sortMessage(suggestions){        
        let mensaje = 'Las sugerencias para hoy son '
        let i = 0
        for (const key of suggestions) {                              
            i++
            if(i==suggestions.length){
                mensaje += key['name']
            }
            else {
                mensaje += key['name'] + ','
            }      
        }

        console.log(mensaje)
        return mensaje
    }
  }