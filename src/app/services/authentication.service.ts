import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { AppGlobalsService } from '../app-globals.service';
// import 'rxjs/add/operator/map'
import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private _global: AppGlobalsService) { }

    login(username: string, password: string) {
       

        var authenticate_url:string =  this._global.baseAppUrl+'auth/authenticate';
            
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify({username: username, password: password});
        let options = new RequestOptions({headers: headers });
        
        return this.http.post(`${authenticate_url}`, body, options)
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let user = response.json();

              if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user.message));
            }
        })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
     WindowsauthenticateUser(): Observable<any> {
        console.log('Calling GetUser');
        var authenticate_url:string =  this._global.baseAppUrl+'auth/Windowsauthenticate';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http.get(`${authenticate_url}`, options)
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let user = response.json();
          console.log(response);
        })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}