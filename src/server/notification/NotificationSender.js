export default class NotificationSender {
  constructor(sender) {
    this.sender = sender
  }
  send(to, msg) {
    this.sender.send(to, msg)
  }
}