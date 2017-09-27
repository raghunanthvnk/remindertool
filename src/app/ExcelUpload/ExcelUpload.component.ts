import {  Component } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {UploadService} from '../services//upload.service';

//ref: https://ciphertrick.com/2016/10/24/file-upload-with-angular2-nodejs/

import { FileUploader ,FileItem,ParsedResponseHeaders,FileLikeObject} from 'ng2-file-upload';

import { SpotCheck } from '../models/SpotCheckFields';  

// import {ExcelDownloadComponent} from '../ExcelDownload/ExcelDownload.component'


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component ({  
   selector: 'my-app',  
   templateUrl:'./excelUpload.html',
   providers:[UploadService]

})  
export class ExcelUploadComponent  { 
 
  public Checklist: SpotCheck[];
  public project_master:any[];
  public radio_button_opted:any;

  uploader:FileUploader;

  constructor(private uploadservice: UploadService ){
    this.Checklist=[];
    this.project_master=[];
   
  }
  ngOnInit(): void {
      this.uploader = new FileUploader({
          url: 'http://localhost:5000/upload',
          allowedFileType: ['xls','xlsx'],
          removeAfterUpload: false
          // headers: [{name:'Accept', value:'application/json'}],
          // autoUpload: true,
      });
      this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
      this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
      
    //  this.uploader.

      //retieve projectmaster details
      this.getProjectMaster("","SELECT PROJECT MASTER");
     
  
    }


  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    console.log("onSuccessItem " + status, response, item);  
    
    this.Checklist = JSON.parse(response); //success server response
    
    var data = this.validateRow(this.Checklist);


     // SQA,SEPG,PM
    this.UpdateQualityExcel(this.radio_button_opted,data);
     
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
      let error = JSON.parse(response); //error server response
  }

  radiobtnopted(selectedValue:any)
  {
    
    this.radio_button_opted  =selectedValue
    console.log(selectedValue);
       
  }

  validateRow(lst:any[]) : SpotCheck[]
  {
    var i:number;
      for(i=0;i<lst.length ;i++)
      {
        var validation_message:string="";
        var blnErrOccured:boolean=false;

        if(lst[i].PROJECT_CODE=="")
        {
          validation_message="Enter PROJECT_CODE"
          blnErrOccured=true;
        }
        if(lst[i].PROJECT_CODE!="")
        {
            var result:boolean=true;
            result = this.searchpropertyInJSON(lst[i].PROJECT_CODE)
            if(result==false)
            {
            
              blnErrOccured=true;
              validation_message=validation_message+ "," +"THIS PROJECT CODE DOES NOT EXIST IN PROJECT MASTER;"
            }
        }
     
        if(lst[i].ACTIVITY_NAME=="" ||lst[i].ACTIVITY_NAME==undefined )
        {

          validation_message=validation_message+ "," +"Enter ACTIVITY_NAME"
          blnErrOccured=true;
        }
        if(Number(lst[i].ACTIVITY_NAME))
        {

          validation_message=validation_message+ "," +"ACTIVITY_NAME is invalid"
          blnErrOccured=true;
        }
        if(lst[i].MODULE_NAME==""||lst[i].MODULE_NAME==undefined)
        {

          validation_message=validation_message+ "," +"Enter MODULE_NAME"
          blnErrOccured=true;
        }
        if(Number(lst[i].MODULE_NAME))
        {

          validation_message=validation_message+ "," +"MODULE_NAME is invalid"
          blnErrOccured=true;
        }
        if(lst[i].RESPONSIBLE==""||lst[i].RESPONSIBLE==undefined)
        {

          validation_message=validation_message+ "," +"Enter RESPONSIBLE_PERSON"
          blnErrOccured=true;
        }
        if(Number(lst[i].RESPONSIBLE))
        {

          validation_message=validation_message+ "," +"RESPONSIBLE_PERSON is invalid"
          blnErrOccured=true;
         
        }
        if(lst[i].RESPONSIBLE_PERSON_EMAIL_ID==""||lst[i].RESPONSIBLE_PERSON_EMAIL_ID==undefined)
        {

          validation_message=validation_message+ "," +"Enter RESPONSIBLE_PERSON_EMAIL_ID"
          blnErrOccured=true;
        }
        if(!this.isEmail(lst[i].RESPONSIBLE_PERSON_EMAIL_ID))
        {
          validation_message=validation_message+ "," +"RESPONSIBLE_PERSON_EMAIL_ID is invalid"
          blnErrOccured=true;
        }
        if(lst[i].MITS_QUALITY_EMAIL_ID==""||lst[i].MITS_QUALITY_EMAIL_ID==undefined)
        {

          validation_message=validation_message+ "," +"Enter MITS_QUALITY_EMAIL_ID"
          blnErrOccured=true;
        }
        if(!this.isEmail(lst[i].MITS_QUALITY_EMAIL_ID))
        {
          validation_message=validation_message+ "," +"MITS_QUALITY_EMAIL_ID is invalid"
          blnErrOccured=true;
        }
        if(lst[i].EXPECTED_CLOSURE_DATE==""||lst[i].EXPECTED_CLOSURE_DATE==undefined)
        {

          validation_message=validation_message+ "," +"Enter EXPECTED_CLOSURE_DATE"
          blnErrOccured=true;
        }
        if(!this.isDate(lst[i].EXPECTED_CLOSURE_DATE))
        {
          validation_message=validation_message+ "," +"EXPECTED_CLOSURE_DATE is invalid"
          blnErrOccured=true;
        }
        if(lst[i].ACTUAL_CLOSURE_DATE==""||lst[i].ACTUAL_CLOSURE_DATE==undefined)
        {

          validation_message=validation_message+ "," +"Enter ACTUAL_CLOSURE_DATE"
          blnErrOccured=true;
        }
        if(!this.isDate(lst[i].ACTUAL_CLOSURE_DATE))
        {
          validation_message=validation_message+ "," +"ACTUAL_CLOSURE_DATE is invalid"
          blnErrOccured=true;
        }
        if(lst[i].STATUS==""||lst[i].STATUS==undefined)
        {

          validation_message=validation_message+ "," +"Enter STATUS"
          blnErrOccured=true;
        }

       lst[i].VALIDATION_RESULT=validation_message;
       lst[i].DATABASE_MESSAGE="";
       lst[i].SC_ACTIVITY_CLOSED_TODAY="";
      }
      return lst;
    }

  isDate(date:string):boolean {
    var  isvalid:boolean;

    var result = new Date(date);
    if (result.toString() == 'Invalid Date') {
      isvalid = false;
    } else {
      isvalid = true;
    }
   

    return isvalid;
  }

  searchpropertyInJSON(search:string):boolean
  {
    var  serchfind:boolean;
    for(var j=0;j<this.project_master.length ;j++)
    {
      if(search==this.project_master[j].PROJECT_CODE)
      {
        serchfind=true;
        break;
      }
      else
      {
        serchfind=false;
      }
    }

    return serchfind
  }
  isEmail(search:string):boolean
  {
    var  serchfind:boolean;

    var trigger = "2",
    regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    serchfind = regexp.test(search);

    console.log(serchfind)
    return serchfind
  }
  
  getProjectMaster(project_code:string,Flag:string):any
  {  

    this.uploadservice.getProjectMaster(project_code,Flag).subscribe(
        response=> {
          this.project_master= response[0];
          return response;
          },
        error=> {
            console.log("ERROR: ",error);
            console.log(error.json()); //gives the object object
        },
        () => {
            console.log("Completed");
        }
    );
  }


  UpdateQualityExcel(Flag:string,data:any):any
  {  

    this.uploadservice.UpdateQualityExcel(Flag,data).subscribe(
        response=> {
          console.log("VALUE RECEIVED: ",response);
          
          this.exportAsExcelFile(response,Flag)

          },
        error=> {
            console.log("ERROR: ",error);
            console.log(error.json()); //gives the object object
        },
        () => {
            console.log("Completed");
        }
    );
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}