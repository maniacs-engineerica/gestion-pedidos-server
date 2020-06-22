export default class PurchaseNotificationSender {
  constructor(sender) {
    this.sender = sender
  }
  send(phone, state) {
    const text = "El estado del pedido es " + state
    try {
      this.sender.send(phone, text)
    }
    catch (err) {
      console.log("Falló el envío de sms \n Contenido: " + text + "\n Destinatario: " + phone)
    }
  }
}