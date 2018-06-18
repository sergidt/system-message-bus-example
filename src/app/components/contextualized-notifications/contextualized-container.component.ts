import { Component, OnInit, Input, ElementRef, NgZone } from '@angular/core';
import { MessageBusService, MessageAction } from '../../services/message-bus.service';
import { interval } from 'rxjs';
import { tap } from 'rxjs/operators';
import { highlightElement } from '../../services/utils';

@Component({
  selector: 'contextualized-container',
  templateUrl: './contextualized-container.component.html',
  styleUrls: ['./contextualized-container.component.css'],
  providers: [MessageBusService]
})
export class ContextualizedContainerComponent {
@Input() color: string;

  constructor(private elementRef: ElementRef, private zone: NgZone, private messageBus: MessageBusService) { 
      interval(3000)
      .pipe(tap(() => highlightElement(this.elementRef, this.zone, this.color)))
      .subscribe(() => this.messageBus.push({type: MessageAction.NotifyContext, data: {color: this.color}}));
  }
}