import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import {Chat, StudentDetails} from "../../models/user-details.model";
import {LoginService} from "../../login/login.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: any;
  history: Chat[] = [];
  constructor(public chat: ChatService, public login: LoginService) { }

  ngOnInit(): void {
    this.chat.getUsers().subscribe(users => {
      console.log(users)
      this.users = users;
    })
  }

  openChat(event, user) {
    this.chat.chattingWith.next({
      email: user.value,
      password: user.value,
      id: user.key
    })
    this.chat.uploadHistory(`team_${this.login.Student.current_team_id}`)
    this.chat.get_history().subscribe(history => {
      console.log(history)
      this.chat.history.push(history);
    })

  }

}
