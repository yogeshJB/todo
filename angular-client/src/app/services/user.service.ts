import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/toPromise';  // way to manage asynchronous data

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  private apiUrl = 'http://localhost:3001/';
  isUserLoggedIn = false;

  constructor(private http: HttpClient) { }

  signin(user: any): Promise<any> {
    console.log('calling', user);
    return this.http.post(this.apiUrl + 'user/login', user, httpOptions)
      .toPromise()
      // .then(this.handleData)
      .then(res => {
       console.log('response login', res);
        // this.handleData(res);
        return res;
      })
      .catch(this.handleError);
  }

  signup(user: any): Promise<any> {
    return this.http.post(this.apiUrl + 'user', user, httpOptions)
      .toPromise()
      // .then(this.handleData)
      .then(res => {
        debugger;
        // this.handleData(res);
        return res;
      })
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
