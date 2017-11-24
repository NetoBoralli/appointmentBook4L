import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  constructor(
    private http: Http
  ) { }

  postUserAPI(user: string, pass: string, type: string) {
    if(!user || !pass){
      return null;
    }

    let url = 'http://localhost:21816/api/users/'+type;
    let body = {username: user, password: pass};
    return this.http
      .post(url, body)
      .toPromise()
      .then((res: Response) => res.json())
      .catch((err: any) => err.json())
  }
}
