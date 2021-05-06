import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup } from '../models/signup';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  data: Signup;
  readonly URL_API = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { 
    this.data = new Signup();
  }

  signup(signup: Signup) {
    return this.http.post(this.URL_API + '/signup', signup);
  }

}
