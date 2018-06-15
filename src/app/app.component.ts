import { Component } from '@angular/core';
import { MessageBusService, MessageAction } from './services/message-bus.service';
import { NotificationType, Notification } from './components/notification-list/notification-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private messageBus: MessageBusService) {
  }

  createInfoNotification() {
    this.messageBus.push({ type: MessageAction.ShowNotification, data: <Notification>{ title: 'Info', description: 'this is an info notification', type: NotificationType.Info } });
  }

  createAlertNotification() {
    this.messageBus.push({ type: MessageAction.ShowNotification, data: <Notification>{ title: 'Alert', description: 'this is an alert notification', type: NotificationType.Alert } });
  }
}
