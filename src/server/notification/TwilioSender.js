import AbstractSender from "./AbstractSender.js";

export default class TwilioSender extends AbstractSender {
  constructor(message){
    super()
    this.message = message
  }

  send(){
    console.log(`Mensaje: ${this.message.text} \nEnviado a: ${this.message.phone} `);
  }

}

export class TwilioMessage {
  constructor(phone, text){
    this.phone = phone
    this.text = text
  }
}