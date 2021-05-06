import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit {

  alert: boolean;
  idTask: string;
  idUser: string;

  constructor(public taskService: TaskService) {
    this.alert = false;
    this.idTask = "";
    this.idUser = "";
  }

  ngOnInit(): void {
    this.taskService.showData.subscribe(data => {
      this.showMsg(data.newData._id, data.newData.user);
    });
  }

  showMsg(id: string, user: string) {
    this.idTask = id;
    this.idUser = user;
    this.alert = true;
    setTimeout(() => {
      this.alert = false;
    }, 3000);
  }

}
