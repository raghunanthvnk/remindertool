/*
* Angular 2 CRUD application using Nodejs
*/
import { ResponseContentType } from '@angular/http';

import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { serviceLine } from '../models/serviceLine';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class HttpService {

    private BASE_URL:string = 'http://localhost:5000/serviceline_dtl';
    private projectcodedtl_URL:string = 'http://localhost:5000/project_codes_dtl?ServiceLine=';
    private activityname_URL:string = 'http://localhost:5000/ActivityNames_Get';
    

    constructor(
	        private http: Http
	) { }

	public getServiceLinedtl(){
      
		return this.http.get(`${this.BASE_URL}`)
			.map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
    
    public getProjectCode(serviceline:string){
        
          return this.http.get(`${this.projectcodedtl_URL+serviceline}`)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getActivityNames(){
        
          return this.http.get(`${this.activityname_URL}`)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getSubActivityDates(ActivityName:string,Project_code:string){
        
        var subactivity_URL:string = 'http://localhost:5000/SUBACTIVITY_GET/?ActivityName='+ActivityName+'&Project_code='+Project_code;

          return this.http.get(`${subactivity_URL}`)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    public GetSpotCheckDetailsforProject(ActivityId:string){
        
        var SCDetails_URL:string = 'http://localhost:5000/SpotCheckDetailsforProject_GET/?ActivityId='+ActivityId;

          return this.http.get(`${SCDetails_URL}`)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    public AddSpotCheckDetails(mode:string,project_code:string,data:any,activity:any){
        
        var AddSpotCheckDetails_URL:string = 'http://localhost:5000/api/UpdateSpotCheckDetails/?ProjectCode='+project_code+'&mode='+mode;

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify({spot_check_details: data, activity: activity});
        let options = new RequestOptions({headers: headers });
        
        return this.http.post(`${AddSpotCheckDetails_URL}`, body, options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public GetRemindersData(Flag:string){
        
        var GetRemindersData_URL:string = 'http://localhost:5000/api/RemindersData/?Flag='+Flag;

        
        return this.http.get(`${GetRemindersData_URL}`)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

       
    }

	public deleteUser(usersID:string){

        let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });

		return this.http.delete(`${this.BASE_URL}${usersID}`,options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
                     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
      }

}
