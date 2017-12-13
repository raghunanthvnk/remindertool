/*
* Angular 2 CRUD application using Nodejs
*/

import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions,ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { AppGlobalsService } from '../app-globals.service';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class UserService {

  constructor(  private http: Http, private _global: AppGlobalsService) { }

  public PIRSubmit(mode:string,data:any){
    
    var PIRSubmit_URL:string = this._global.baseAppUrl+'pir/UpdatePIRDetails';

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let body = JSON.stringify({pir_details: data, mode: mode});
    let options = new RequestOptions({headers: headers });
    
    return this.http.post(`${PIRSubmit_URL}`, body, options)
                .map((res:Response) => res.json())
                .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  public GET_PIR_RECORDS_FORDT(pagesIndex:number,pageSize:number){
    
    var GET_PIR_RECORDS_FORDT_URL:string = this._global.baseAppUrl+'pir/GET_PIR_RECORDS_FORDT?pagesIndex='+pagesIndex+'&pageSize='+pageSize;
   
    return this.http.get(`${GET_PIR_RECORDS_FORDT_URL}`)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  public GetPIRHistorybyID(pir_guid:any){
    
    var GetPIRHistorybyID_URL:string = this._global.baseAppUrl+'pir/GetPIRHistorybyID/?pir_guid='+pir_guid;

      return this.http.get(`${GetPIRHistorybyID_URL}`)
          .map((res:Response) => res.json())
          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  public GetAllPIRHistory(){
    
    var GET_PIR_RECORDS_FORDT_URL:string = this._global.baseAppUrl+'pir/GetAllPIRHistory';
   
    return this.http.get(`${GET_PIR_RECORDS_FORDT_URL}`)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  
}
