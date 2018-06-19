import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Subscription } from 'rxjs';

import { MessageBusService, MessageAction } from '../../services/message-bus.service';

export enum NotificationType {
  Info = 'info',
  Alert = 'alert'
}

export interface Notification {
  title: string;
  description: string;
  type: NotificationType;
  color?: string;
}

@Component({
  selector: 'notification-list',
  templateUrl: './notification-list.component.html',
  animations: [
    trigger('flyInOut', [
      state('void', style({ transform: 'translateY(300px)' })),
      transition('void => *', [
        animate('0.5s ease',
          style({ transform: 'translateY(0)' }))
      ]),
      transition('* => void', [
        animate('1s 2s ease',
          style({ transform: 'translateY(-5000%)' }))
      ])
    ])
  ],
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[];

  notifications: Notification[] = [];

  constructor(private messageBus: MessageBusService) {
  }

  ngOnInit() {
    this.subscriptions = [
      this.messageBus.observe(MessageAction.ShowNotification)
        .subscribe(_ => this.notifications = [_.data, ...this.notifications])
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  animationDone(index) {
    this.notifications.splice(index, 1);
  }
}