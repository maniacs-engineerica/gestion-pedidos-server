import Joi from '@hapi/joi'
import twilio from "twilio"
import SmsServiceError from '../errors/smsServiceError'
import AbstractSender from "./AbstractSender.js";

export default class TwilioSender extends AbstractSender {
  constructor(config){
    super()
    this._setConfig(config)
    this.client = new twilio(this.accountSid, this.authToken)
  }

  send(recipient, body) {
    try{
        this._validateSms({recipient, body})
        this.client.messages
        .create({
            body: body,
            from: this.sender,
            to: recipient
        })
        .then(message => console.log(`Mensaje: ${message.body} \nEnviado a: ${message.to} `))
    }
    catch(err){
        throw new SmsServiceError('Error al enviar SMS', 'Datos del mensaje inválidos')
    }        
}

  _setConfig(config){
    try{
        this._validateConfig(config)
        this.accountSid = config.accountSid
        this.authToken = config.authToken
        this.sender = config.sender
    } catch(error){
        throw new SmsServiceError('Error al configurar datos del proveedor','Datos de configuración inválidos')
    }        
  }

  _validateConfig(config){
      const configSchema = Joi.object({
          accountSid: Joi.string().alphanum().min(34).max(34).required(),
          authToken: Joi.string().alphanum().min(32).max(32).required(),
          sender: Joi.string().regex(/^\+[1-9]\d{1,11}$/).required()
      })

      const { error } = configSchema.validate(config)
      if (error) {
          throw error
      }
    }

  _validateSms(smsDetails){
    const smsSchema = Joi.object({
        recipient: Joi.string().regex(/^\+[1-9]\d{1,10}$/).required(),
        body: Joi.string().min(1).max(160).required()
    })

    const { error } = smsSchema.validate(smsDetails)
    if (error) {
        throw error
    }
  }
}
