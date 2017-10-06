import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        console.log(username)

        var authenticate_url:string = 'http://localhost:5000/api/authenticate';
            
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify({username: username, password: password});
        let options = new RequestOptions({headers: headers });
        
        return this.http.post(`${authenticate_url}`, body, options)
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let user = response.json();

         

            if (user) {//   if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        })
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}