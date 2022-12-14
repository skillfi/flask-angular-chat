import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Message } from '../../models/message.model';
import { UserDetails, StudentDetails, Chat } from '../../models/user-details.model';
import { LoginService } from 'src/app/login/login.service';
import axios from 'axios';

const instance = axios.create();

export default instance;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messageText: string;
  message: Message;
  filter: any;
  chattingWith: UserDetails;
  student: StudentDetails;
  room: string;
  history: Chat;
  constructor(public chat: ChatService, public login: LoginService) { }

  ngOnInit(): void {
    this.chat.get_history().subscribe(chat_history => {
      this.chat.history.push(chat_history)
    })
    this.chat.getMessage().subscribe(message => {
      this.chat.messages.push(message)
    })
    this.chat.chattingWith.subscribe(user => {
      this.chattingWith = user
      this.filter = {
        $or: [{ from: user.id }, { to: user.id }]
      }
    })
  }

  sendMessage() {
    this.message = {
      message: this.messageText,
      from: this.chattingWith.id,
      room: `team_${this.login.Student.current_team_id}`,
      student: this.login.Student,
      date: new Date()
    }
    this.messageText = ''
    this.chat.sendMessage(this.message)
  }

  History() {
    this.chat.get_history()
    console.log(history)
  }

  get_team(): void {
    // const data = this.as.response;
    const response = instance.get('http://localhost:8080/api/chat-history')
  }

}
