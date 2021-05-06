import { EventEmitter, Injectable, Output } from '@angular/core';
import { Task } from '../models/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  @Output() showData: EventEmitter<any> = new EventEmitter();
  data: Task;
  readonly URL_API = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {
    this.data = new Task();
  }

  getTasks(): Observable<Task[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    return this.http.get<Task[]>(this.URL_API + '/tasks', { headers: headers });
  }

  postTask(Task: Task) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    return this.http.post(this.URL_API, Task, { headers: headers });
  }

  deleteTask(_id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    return this.http.delete(this.URL_API + '/task/' + _id, { headers: headers });
  }

  putTask(): Observable<Task[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    return this.http.get<Task[]>(this.URL_API + '/tasks', { headers: headers });
  }

  getUserTasks(): Observable<Task[]> {
    const token = localStorage.getItem('ACCESS_TOKEN') || '{}';
    const _id = this.getDecodedAccessToken(token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    return this.http.get<Task[]>(this.URL_API + '/tasksUser', { headers: headers });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

}
