import { User } from './../shared/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncLocalStorage } from 'angular-async-local-storage';

import { LoginService } from './../login/shared/login.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  password: string;
  confirmPassword: string;
  equal: boolean = true;
  exists: boolean = true;
  user: User;
  // users: any[] = [];

  constructor(
    private route: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  validatePassword() {
    if (this.password != this.confirmPassword) {
      this.equal = false;
    } else {
      this.equal = true;
    }
  }

  createAccount(f) {
    this.loginService.postUserAPI(f.value.username, f.value.password, 'singup').then((data) => {
      if (data == 'User already exists') {
        this.exists = false;
        // f.reset();
      } else {
        this.user = new User(data, f.value.username);
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.route.navigate(['/contacts']);
      }
    });
  }
}
