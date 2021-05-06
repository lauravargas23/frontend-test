import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() _id: string | undefined;
  @Input() percent: string | undefined;
  @Input() description: string | undefined;
  @Input() user: string | undefined;
  @Input() state: string | undefined;
  @Input() comment: string | undefined;

  visible: boolean;

  constructor(public taskService: TaskService) {
    this.visible = false;
  }

  ngOnInit(): void {
  }

  setVisible() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

}
