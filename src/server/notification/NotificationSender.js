export default class NotificationSender {
  constructor(sender) {
    this.sender = sender
  }
  send() {
    this.sender.send()
  }
}