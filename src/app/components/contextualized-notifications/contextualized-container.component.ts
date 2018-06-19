import { Component, OnInit, Input, ElementRef, NgZone } from '@angular/core';
import { MessageBusService, MessageAction } from '../../services/message-bus.service';
import { interval } from 'rxjs';
import { tap } from 'rxjs/operators';
import { highlightElement, getRandomInt } from '../../services/utils';
import { Notification, NotificationType } from '../notification-list/notification-list.component';

@Component({
  selector: 'contextualized-container',
  templateUrl: './contextualized-container.component.html',
  styleUrls: ['./contextualized-container.component.css'],
  providers: [MessageBusService]
})
export class ContextualizedContainerComponent {
@Input() color: string;

children: string[];

@Input() set childrenCount(value: number) {
  this.children = Array(value).fill('');
}

  constructor(private elementRef: ElementRef, private zone: NgZone, private messageBus: MessageBusService) { 
    const intervalDelay = getRandomInt(1500, 4000);
      interval(intervalDelay)
      .pipe(tap(() => highlightElement(this.elementRef, this.zone, this.color)))
      .subscribe(() => this.messageBus.push({type: MessageAction.NotifyContext, data: {color: this.color}}));
  }

  createInfoNotification() {
    this.messageBus.push({ type: MessageAction.ShowNotification, data: <Notification>{ title: 'Info', description: 'Message from a container', type: NotificationType.Info } });
  }

}