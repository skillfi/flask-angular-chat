import { Injectable } from '@angular/core';
import { Chat, UserDetails } from '../models/user-details.model';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Message } from '../models/message.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: UserDetails;
  messages: Message[] = [];
  history: Chat[] = [];
  chattingWith = new Subject<UserDetails>();

  constructor(private socket: Socket) { }

  sendMessage(message: Message) {
    console.log(message)
    this.socket.emit('message', message);
  }

  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data: any) => data))
  }

  getUsers() {
    return this.socket.fromEvent('current_users').pipe(map((data: any) => data))
  }

  uploadHistory(room_id: string) {
    console.log(room_id)
    this.socket.emit('history', room_id)
  }

  get_history() {
    return this.socket.fromEvent('history').pipe(map((data: any) => data))
  }


}
