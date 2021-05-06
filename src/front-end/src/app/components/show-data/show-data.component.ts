import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit {

  alert: boolean;
  msg: string;

  constructor(public taskService: TaskService) {
    this.alert = false;
    this.msg = "";
  }

  ngOnInit(): void {
    this.taskService.showData.subscribe(data => {
      this.showMsg(data.newData._id);
    });
  }

  showMsg(msg: string) {
    this.msg = msg;
    this.alert = true;
    setTimeout(() => {
      this.alert = false;
    }, 3000);
  }

}
