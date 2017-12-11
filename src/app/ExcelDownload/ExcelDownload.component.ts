

// export data to excel code borrowed from  'https://github.com/bogdancar/xlsx-json-to-xlsx-demo-Angular2'

//npm install xlsx  --save ,  npm install file-saver --save 
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


// import * as wjcXlsx from 'wijmo/wijmo.xlsx';
// import { exportExpenseReport } from './expenseReportExport';


import { Component, EventEmitter, Input,Injectable, Inject, enableProdMode, AfterViewInit, NgModule } from '@angular/core';
import { ResponseContentType } from '@angular/http';
import {HttpService} from '../services/http.service';
import { AppModule } from '../app.module'; 
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


import 'rxjs/Rx' ;

@Component ({  
   selector: 'my-app',  
   templateUrl:'./excelDownload.html',
   providers:[HttpService]
})  
@Injectable()
export class ExcelDownloadComponent {  
      constructor(private httpService: HttpService )
      {

      }
      GetRemindersData(Flag:string)
      {
           this.httpService.GetRemindersData(Flag).subscribe(
           data=>this.exportAsExcelFile((data[1]),Flag),
           error => console.log("Error downloading the file."),
           () => console.info("OK"));
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
      downloadFile(data:any[]){
        console.log(data);
        var blob = new Blob([data], { type: 'application/vnd.ms-excel' });
        var url= window.URL.createObjectURL(blob);
        window.open(url);
      }
}