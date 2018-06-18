import { Component, OnInit, Input, ElementRef, NgZone } from '@angular/core';
import { highlightElement } from '../../services/utils';
import { element } from 'protractor';
import { MessageBusService, MessageAction } from '../../services/message-bus.service';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'led',
  templateUrl: './led.component.html',
  styles: [`
  :host {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: block;
    border: solid 1px;
    background-color: white;
    margin-right: 5px;
}
  `]
})
export class LedComponent implements OnInit {

  constructor(private elementRef: ElementRef, private zone: NgZone, private messageBus: MessageBusService) {
  }

  ngOnInit() {
    this.messageBus.observe(MessageAction.NotifyContext)
    .pipe(delay(500))
    .subscribe(msg => highlightElement(this.elementRef, this.zone, msg.data.color));
  }
}
