import { Component, OnInit,  Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-user',
  templateUrl: './task-user.component.html',
  styleUrls: ['./task-user.component.css']
})
export class TaskUserComponent implements OnInit {

  @Input() newData: any;
  toDoList: any[];
  doingList: any[];
  doneList: any[];
  authorized: boolean;
  visible: boolean;

  constructor(public taskService: TaskService) {
    this.toDoList = [];
    this.doingList = [];
    this.doneList = [];
    this.authorized = false;
    this.visible = false;
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
    this.taskService.getUserTasks()
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

  showId(task: Task) {
    this.visible = true;
    this.taskService.showData.emit({
      newData: task
    });
  }

}
