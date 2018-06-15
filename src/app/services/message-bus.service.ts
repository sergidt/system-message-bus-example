import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { filter, first } from 'rxjs/operators';

export enum MessageAction {
  ShowNotification = 'ShowNotification'
}

export interface Message {
    type: MessageAction;
    data?: any;
}

@Injectable()
export class MessageBusService {
    private messages$: Subject<Message> = new Subject<Message>();

    observe = (type: string): Observable<any> => this.messages$.pipe(filter(msg => msg.type === type));

    push = (message: Message) => this.messages$.next(message);
}
