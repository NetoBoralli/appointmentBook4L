import { User } from './../shared/user';
import { Component, OnInit } from '@angular/core';
import { RequiredValidator } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logged: boolean = true;
  user: User;

  constructor(
    private route: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  login(f) {
    this.loginService.postUserAPI(f.value.username, f.value.password, 'login').then((data)=>{
      if(data == 'User or password incorrect'){
        this.logged = false;
        f.reset();
      }else{
        this.user = new User(data.id, data.username);
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.route.navigate(['/contacts']);
      }
    });
  }

}
