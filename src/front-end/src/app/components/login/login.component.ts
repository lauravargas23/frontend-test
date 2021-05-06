import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})

export class LoginComponent implements OnInit {

  alert: boolean;
  msg: string;

  constructor(public loginService: LoginService, private router: Router) {
    this.alert = false;
    this.msg = "";
  }

  ngOnInit(): void {
  }

  loginAction(form: NgForm) {
    if (!form.value.email || !form.value.password) {
      this.showMsg("Empty fields");
    } else {
      this.loginService.login(form.value)
        .subscribe(res => {
          if (res.token) {
            const token = res.token;
            const expiresIn = res.expiresIn;
            this.loginService.saveToken(token, expiresIn);
            this.clean(form);
            let decodeToken = this.getDecodedAccessToken(token);
            if (decodeToken.user.rol != 'user') {
              localStorage.setItem("ROL", decodeToken.user.rol);
              this.navigateTo('/list');
            } else {              
              this.navigateTo('/userList');
            }
          }
        }, (err) => {
          this.showMsg("Incorrect email or password");
        });
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  showMsg(msg: string) {
    this.msg = msg;
    this.alert = true;
    setTimeout(() => {
      this.alert = false;
    }, 3000);
  }

  clean(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

}
