import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login, Response } from '../models/login';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  data: Login;
  public token: any;
  readonly URL_API = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {
    this.data = new Login();
    this.token = null;
  }

  login(login: Login): Observable<Response> {
    return this.http.post<Response>(this.URL_API + '/login', login);
  }

  logout(): void {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("ROL");
    this.token = null;
  }

  getUsers(): Observable<User[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
    });
    return this.http.get<User[]>(this.URL_API, { headers: headers });
  }

  saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

}
