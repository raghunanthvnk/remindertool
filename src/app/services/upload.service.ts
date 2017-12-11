import { ResponseContentType } from '@angular/http';

import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { serviceLine } from '../models/serviceLine';

import {Observable} from 'rxjs/Rx';

import { AppGlobalsService } from '../app-globals.service';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UploadService {

 

    constructor(
      private http: Http, private _global: AppGlobalsService
  ) { }

  public getProjectMaster(project_code:string,Flag:string){

    var BASE_URL:string = this._global.baseAppUrl+'qmExcelUpload/getProjectMaster?project_code='+project_code+'&Flag='+Flag;
    
    return this.http.get(`${BASE_URL}`)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
}

public UpdateQualityExcel(Flag:string,data:any){
  
  var AddSpotCheckDetails_URL:string = this._global.baseAppUrl+'qmExcelUpload/UpdateQualityExcel?Flag='+Flag;

  let headers = new Headers({ 'Content-Type': 'application/json' });
  let body = JSON.stringify({EXCEL_ROWS: data});
  let options = new RequestOptions({headers: headers });
  
  return this.http.post(`${AddSpotCheckDetails_URL}`, body, options)
              .map((res:Response) => res.json())
              .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
}

}
