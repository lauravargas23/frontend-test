import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  toDoList: any[];
  doingList: any[];
  doneList: any[];
  authorized: boolean;

  constructor(public taskService: TaskService) {
    this.toDoList = [];
    this.doingList = [];
    this.doneList = [];
    this.authorized = false;
  }

  ngOnInit(): void {
    this.listTasks();
  }

  deleteTask(_id: string) {
    this.taskService.deleteTask(_id)
      .subscribe(res => {
        console.log(res);
      }, (err) => {
        if(err.status == 200){
          this.listTasks();
        }
        console.log('error', err.status)
      });
  }

  listTasks() {
    this.toDoList = [];
    this.doingList = [];
    this.doneList = [];
    this.taskService.getTasks()
      .subscribe(res => {
        this.authorized = true;
        for (let i = 0; i < res.length; i++) {
          if (res[i].state == 'To Do') {
            this.toDoList.push(res[i]);
          } else if (res[i].state == 'Doing') {
            this.doingList.push(res[i]);
          } else {
            this.doneList.push(res[i]);
          }
        }
      }, (err) => {
        console.log('error', err)
      });
  }

}
