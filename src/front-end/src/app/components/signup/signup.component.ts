import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService],
})
export class SignupComponent implements OnInit {

  alert: boolean;
  msg: string;

  constructor(public signupService: SignupService, private router: Router) {
    this.alert = false;
    this.msg = "";
  }

  ngOnInit(): void {
  }

  signUpAction(form: NgForm) {
    if (!form.value.email || !form.value.password) {
      this.showMsg('Empty fields');
    } else if (form.value.password != form.value.passwordRepeat) {
      this.showMsg('Passwords do not match');
    } else {
      this.signupService.signup(form.value)
        .subscribe(res => {
          if (res) {
            this.showMsg('User registered, please log in');
            this.clean(form);
          }
        }, (err) => {
          this.showMsg('Email previously registered');
        });
    }
  }

  clean(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  showMsg(msg: string) {
    this.msg = msg;
    this.alert = true;
    setTimeout(() => {
      this.alert = false;
    }, 3000);
  }

}
