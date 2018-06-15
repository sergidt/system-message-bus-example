import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Notification } from '../notification-list/notification-list.component';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {
  @Input() notification: Notification;
}