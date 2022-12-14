import { Injectable } from '@angular/core';
import { StudentDetails, UserDetails } from '../models/user-details.model';
import { Socket } from 'ngx-socket-io';
import axios from 'axios';
import { FormBuilder } from '@angular/forms';
import { resolve } from 'dns';

const instance = axios.create();

export default instance;

let student: StudentDetails = {};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: UserDetails;
  isAuthenticated = false;
  response: object;
  public Student: StudentDetails;

  constructor(private socket: Socket) {
  }

  login(user: UserDetails) {
    this.login_to_service(user).then(value => { this.Student = value }).then(() => this.socket.emit('sign_in', this.Student, `team_${this.Student.current_team_id}`))
    this.user = user
    this.isAuthenticated = true;
  }

  login_to_service(user: UserDetails) {
    // let student = this.student
    try {
      const data = {
        email: user.email,
        password: user.password
      };
      const config = {
        headers: { 'Content-Type': 'multipart/form-data', 'Connection': 'keep-alive' },
      };
      const resp = instance.post('http://localhost:8080/api/login', data, config).then(response => {
        let resp2 = response.data.data
        console.log(resp2)
        student = {
          birthday: resp2.user.birthday,
          current_team_id: resp2.default_team,
          email: resp2.user.email,
          grade: resp2.user.grade,
          id: resp2.user.id,
          is_admin: resp2.user.is_admin,
          main_image: resp2.user.main_image,
          name: resp2.user.name,
          team_task_id: resp2.user.team_task_id,
          nickname: resp2.user.nickname,
          questionnaire: resp2.user.questionnaire,
          role: resp2.user.role,
          surname: resp2.user.surname
        };
        return student
      });
      return resp
    } catch (exception) {
      console.log(`ERROR received from ${'http://localhost:8080/api/login'}: ${exception}\n`);
    }

  };
}
