import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {
    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            return true;
        }

        this.router.navigate(['']);
        return false;
    }
}

@Injectable()
export class AuthLoginService implements CanActivate {
    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
          this.router.navigate(['/contacts']);
          return false;
        }
        return true;
    }
}