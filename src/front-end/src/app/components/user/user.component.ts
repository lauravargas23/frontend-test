import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  usersList: any[];
  authorized: boolean;

  constructor(public loginService: LoginService) {
    this.usersList = [];
    this.authorized = false;
  }

  ngOnInit(): void {
    this.listTasks();
  }

  listTasks() {
    this.loginService.getUsers()
      .subscribe(res => {
        this.authorized = true;
        this.usersList = res;
      }, (err) => {
        console.log('error', err)
      });
  }

}
