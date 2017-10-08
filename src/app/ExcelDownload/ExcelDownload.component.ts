

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
      GetRemindersData(Flag:string)
      {
           this.httpService.GetRemindersData(Flag).subscribe(
           data=>this.exportAsExcelFile((data[1]),Flag),
           error => console.log("Error downloading the file."),
           () => console.info("OK"));
       
      }
    // saveExpenses() {
    //     var workbook = <wjcXlsx.Workbook>exportExpenseReport(this.GetRemindersData());
    //     //var xlsx = wijmo.xlsx.XlsxConverter.exportToFile(workbook, 'ExpenseReport.xlsx');
    //     workbook.save('ExpenseReport.xlsx');
    // }
    // ngOnInit() {
    //     const ws_name = 'SomeSheet';
    //     const wb: WorkBook = { SheetNames: [], Sheets: {} };
    //     const ws: any = utils.json_to_sheet(this.table);
    //     wb.SheetNames.push(ws_name);
    //     wb.Sheets[ws_name] = ws;
    //     const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    //     function s2ab(s:any) 
    //     {
    //         const buf = new ArrayBuffer(s.length);
    //         const view = new Uint8Array(buf);
    //         for (let i = 0; i !== s.length; ++i) {
    //         view[i] = s.charCodeAt(i) & 0xFF;
    //         };
    //         return buf;
    //     }
      
    //     saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'exported.xlsx');
    // }
    


    downloadFile(data:any[]){
        console.log(data);
        var blob = new Blob([data], { type: 'application/vnd.ms-excel' });
        var url= window.URL.createObjectURL(blob);
        window.open(url);
       // var workbook = <wjcXlsx.Workbook>this.exportExpenseReport(data);
        //var xlsx = wijmo.xlsx.XlsxConverter.exportToFile(workbook, 'ExpenseReport.xlsx');
        //workbook.save('ExpenseReport.xlsx');
      }
    //    exportExpenseReport(employees: any[]): wjcXlsx.IWorkbook {
        
    //         // Namespace and XlsxConverter shortcuts.
    //         var xcNs = wjcXlsx;
    //         var book = new xcNs.Workbook();
    //         var dateFormat = xcNs.Workbook.toXlsxDateFormat('d'),
    //             stdNumWidth = 85,
    //             simpleCaptionStyle = new xcNs.WorkbookStyle(),
    //             accentCaptionStyle = new xcNs.WorkbookStyle(),
    //             totalCaptionStyle = new xcNs.WorkbookStyle(),
    //             valueStyle = new xcNs.WorkbookStyle(),
    //             highlightedValueStyle = new xcNs.WorkbookStyle(),
    //             tableHeaderStyle = new xcNs.WorkbookStyle(),
    //             tableFooterCurrencyStyle = new xcNs.WorkbookStyle(),
    //             tableValueStyle = new xcNs.WorkbookStyle(),
    //             tableDateStyle = new xcNs.WorkbookStyle(),
    //             tableCurrencyStyle = new xcNs.WorkbookStyle(),
    //             tableIntegerStyle = new xcNs.WorkbookStyle();
        
    //         simpleCaptionStyle.hAlign = xcNs.HAlign.Right;
        
    //         accentCaptionStyle.font = new xcNs.WorkbookFont();
    //         accentCaptionStyle.font.color = '#808097';
        
    //         totalCaptionStyle.basedOn = simpleCaptionStyle;
    //         totalCaptionStyle.font = new xcNs.WorkbookFont();
    //         totalCaptionStyle.font.bold = true;
    //         totalCaptionStyle.hAlign = xcNs.HAlign.Right;
        
    //         valueStyle.font = new xcNs.WorkbookFont();
    //         valueStyle.font.family = 'Arial';
        
    //         highlightedValueStyle.basedOn = valueStyle;
    //         highlightedValueStyle.fill = new xcNs.WorkbookFill();
    //         highlightedValueStyle.fill.color = '#e1e1e1';
        
    //         tableHeaderStyle.font = new xcNs.WorkbookFont();
    //         tableHeaderStyle.font.bold = true;
    //         tableHeaderStyle.fill = new xcNs.WorkbookFill();
    //         tableHeaderStyle.fill.color = '#fad9cd';
        
    //         tableFooterCurrencyStyle.basedOn = tableHeaderStyle;
    //         tableFooterCurrencyStyle.format = xcNs.Workbook.toXlsxNumberFormat('c2');
    //         tableFooterCurrencyStyle.hAlign = xcNs.HAlign.Right;
        
    //         tableValueStyle.fill = new xcNs.WorkbookFill();
    //         tableValueStyle.fill.color = '#f4b19b';
        
    //         tableDateStyle.basedOn = tableValueStyle;
        
    //         tableCurrencyStyle.basedOn = tableValueStyle;
    //         tableCurrencyStyle.format = xcNs.Workbook.toXlsxNumberFormat('c2');
        
    //         tableIntegerStyle.basedOn = tableValueStyle;
    //         tableIntegerStyle.format = xcNs.Workbook.toXlsxNumberFormat('00');
        
    //         for (var emplIdx = 0; emplIdx < employees.length; emplIdx++) {
    //             var empl = employees[emplIdx],
    //                 sheet = new xcNs.WorkSheet(),
    //                 rows = sheet.rows;
        
    //             book.sheets.push(sheet);
    //             sheet.name = empl.Name;
                
    //             sheet.columns[0] = new wjcXlsx.WorkbookColumn();
    //             sheet.columns[0].width = '1ch';
    //             sheet.columns[1] = new wjcXlsx.WorkbookColumn();
    //             sheet.columns[1].width = 100;
    //             sheet.columns[2] = new wjcXlsx.WorkbookColumn();
    //             sheet.columns[2].width = 200;
    //             sheet.columns[3] = new wjcXlsx.WorkbookColumn();
    //             sheet.columns[3].width = stdNumWidth;
    //             sheet.columns[4] = new wjcXlsx.WorkbookColumn();
    //             sheet.columns[4].width = stdNumWidth;
    //             sheet.columns[6] = new wjcXlsx.WorkbookColumn();
    //             sheet.columns[6].width = stdNumWidth;
    //             sheet.columns[7] = new wjcXlsx.WorkbookColumn();
    //             sheet.columns[7].width = stdNumWidth;
    //             sheet.columns[8] = new wjcXlsx.WorkbookColumn();
    //             sheet.columns[8].width = 130;
    //             sheet.columns[9] = new wjcXlsx.WorkbookColumn();
    //             sheet.columns[9].width = 130;
    //             sheet.columns[10] = new wjcXlsx.WorkbookColumn();
    //             sheet.columns[10].width = stdNumWidth;
                
    //             rows[0] = new xcNs.WorkbookRow();
    //             rows[0].cells[8] = new xcNs.WorkbookCell();
    //             rows[0].cells[8].colSpan = 3;
    //             rows[0].cells[8].value = 'For Office Use Only';
    //             rows[0].cells[8].style = new xcNs.WorkbookStyle();
    //             rows[0].cells[8].style.basedOn = highlightedValueStyle;
    //             rows[0].cells[8].style.font = new xcNs.WorkbookFont();
    //             rows[0].cells[8].style.font.italic = true;
        
    //             rows[1] = new xcNs.WorkbookRow();
    //             rows[1].height = 45;
    //             rows[1].cells[1] = new xcNs.WorkbookCell();
    //             rows[1].cells[1].value = 'Expense Report';
    //             rows[1].cells[1].colSpan = 3;
    //             rows[1].cells[1].style = new xcNs.WorkbookStyle();
    //             rows[1].cells[1].style.basedOn = accentCaptionStyle;
    //             rows[1].cells[1].style.font = new xcNs.WorkbookFont();
    //             rows[1].cells[1].style.font.size = 32;
    //             rows[1].cells[1].style.font.bold = true;
                
    //             rows[2] = new xcNs.WorkbookRow();
    //             rows[2].cells[1] = new xcNs.WorkbookCell();
    //             rows[2].cells[1].value = 'PURPOSE:';
    //             rows[2].cells[1].style = accentCaptionStyle;
    //             rows[2].cells[2] = new xcNs.WorkbookCell();
    //             rows[2].cells[2].value = empl.Purpose;
    //             rows[2].cells[5] = new xcNs.WorkbookCell();
    //             rows[2].cells[5].value = 'Attachment:';
    //             rows[2].cells[5].style = accentCaptionStyle;
    //             rows[2].cells[6] = new xcNs.WorkbookCell();
    //             rows[2].cells[6].value = empl.Attachment;
                
    //             rows[5] = new xcNs.WorkbookRow();
    //             rows[5].cells[1] = new xcNs.WorkbookCell();
    //             rows[5].cells[1].value = 'EMPLOYEE IMFORMATION:';
    //             rows[5].cells[1].style = accentCaptionStyle;
    //             rows[5].cells[1].colSpan = 2;
        
    //             rows[6] = new xcNs.WorkbookRow();
    //             rows[6].cells[1] = new xcNs.WorkbookCell();
    //             rows[6].cells[1].value = 'Name';
    //             rows[6].cells[1].style = simpleCaptionStyle;
    //             rows[6].cells[2] = new xcNs.WorkbookCell();
    //             rows[6].cells[2].value = empl.Name;
    //             rows[6].cells[5] = new xcNs.WorkbookCell();
    //             rows[6].cells[5].value = 'Position';
    //             rows[6].cells[5].style = simpleCaptionStyle;
    //             rows[6].cells[6] = new xcNs.WorkbookCell();
    //             rows[6].cells[6].value = empl.Position;
    //             rows[6].cells[9] = new xcNs.WorkbookCell();
    //             rows[6].cells[9].value = 'SSN';
    //             rows[6].cells[9].style = simpleCaptionStyle;
    //             rows[6].cells[10] = new xcNs.WorkbookCell();
    //             rows[6].cells[10].value = empl.SSN;
                
    //             rows[7] = new xcNs.WorkbookRow();
    //             rows[7].cells[1] = new xcNs.WorkbookCell();
    //             rows[7].cells[1].value = 'Department';
    //             rows[7].cells[1].style = simpleCaptionStyle;
    //             rows[7].cells[2] = new xcNs.WorkbookCell();
    //             rows[7].cells[2].value = empl.Department;
    //             rows[7].cells[5] = new xcNs.WorkbookCell();
    //             rows[7].cells[5].value = 'Manager';
    //             rows[7].cells[5].style = simpleCaptionStyle;
    //             rows[7].cells[6] = new xcNs.WorkbookCell();
    //             rows[7].cells[6].value = empl.Manager;
    //             rows[7].cells[9] = new xcNs.WorkbookCell();
    //             rows[7].cells[9].value = 'Employee ID';
    //             rows[7].cells[9].style = simpleCaptionStyle;
    //             rows[7].cells[10] = new xcNs.WorkbookCell();
    //             rows[7].cells[10].value = empl.Id;
        
    //             //================ Expense items table ==========================
    //             // Table header
    //             rows[9] = new xcNs.WorkbookRow();
    //             rows[9].style = new xcNs.WorkbookStyle();
    //             rows[9].style.hAlign = xcNs.HAlign.Center;
    //             rows[9].cells[1] = new xcNs.WorkbookCell();
    //             rows[9].cells[1].value = 'Date';
    //             rows[9].cells[1].style = tableHeaderStyle;
    //             rows[9].cells[2] = new xcNs.WorkbookCell();
    //             rows[9].cells[2].value = 'Decsription';
    //             rows[9].cells[2].style = tableHeaderStyle;
    //             rows[9].cells[3] = new xcNs.WorkbookCell();
    //             rows[9].cells[3].value = 'Hotel';
    //             rows[9].cells[3].style = tableHeaderStyle;
    //             rows[9].cells[4] = new xcNs.WorkbookCell();
    //             rows[9].cells[4].value = 'Transport';
    //             rows[9].cells[4].style = tableHeaderStyle;
    //             rows[9].cells[5] = new xcNs.WorkbookCell();
    //             rows[9].cells[5].value = 'Fuel';
    //             rows[9].cells[5].style = tableHeaderStyle;
    //             rows[9].cells[6] = new xcNs.WorkbookCell();
    //             rows[9].cells[6].value = 'Meal';
    //             rows[9].cells[6].style = tableHeaderStyle;
    //             rows[9].cells[7] = new xcNs.WorkbookCell();
    //             rows[9].cells[7].value = 'Misc';
    //             rows[9].cells[7].style = tableHeaderStyle;
    //             rows[9].cells[8] = new xcNs.WorkbookCell();
    //             rows[9].cells[8].value = 'Parking (per hour)';
    //             rows[9].cells[8].style = tableHeaderStyle;
    //             rows[9].cells[9] = new xcNs.WorkbookCell();
    //             rows[9].cells[9].value = 'Parking (hours)';
    //             rows[9].cells[9].style = tableHeaderStyle;
    //             rows[9].cells[10] = new xcNs.WorkbookCell();
    //             rows[9].cells[10].value = 'Total';
    //             rows[9].cells[10].style = tableHeaderStyle;
        
    //             // Table items
    //             var expenses = <any[]>empl.Expenses,
    //                 firstIdx = 10,
    //                 totalIdx = firstIdx + expenses.length;
    //             for (var i = 0; i < expenses.length; i++) {
    //                 var curExpense = expenses[i],
    //                     rowIdx = firstIdx + i;
    //                 rows[rowIdx] = new xcNs.WorkbookRow();
    //                 rows[rowIdx].cells[1] = new xcNs.WorkbookCell();
    //                 rows[rowIdx].cells[1].value = curExpense.Date;
    //                 rows[rowIdx].cells[1].style = tableDateStyle;
    //                 rows[rowIdx].cells[2] = new xcNs.WorkbookCell();
    //                 rows[rowIdx].cells[2].value = curExpense.Decsription;
    //                 rows[rowIdx].cells[2].style = tableCurrencyStyle;
    //                 rows[rowIdx].cells[3] = new xcNs.WorkbookCell();
    //                 rows[rowIdx].cells[3].value = curExpense.Hotel;
    //                 rows[rowIdx].cells[3].style = tableCurrencyStyle;
    //                 rows[rowIdx].cells[4] = new xcNs.WorkbookCell();
    //                 rows[rowIdx].cells[4].value = curExpense.Transport;
    //                 rows[rowIdx].cells[4].style = tableCurrencyStyle;
    //                 rows[rowIdx].cells[5] = new xcNs.WorkbookCell();
    //                 rows[rowIdx].cells[5].value = curExpense.Fuel;
    //                 rows[rowIdx].cells[5].style = tableCurrencyStyle;
    //                 rows[rowIdx].cells[6] = new xcNs.WorkbookCell();
    //                 rows[rowIdx].cells[6].value = curExpense.Meal;
    //                 rows[rowIdx].cells[6].style = tableCurrencyStyle;
    //                 rows[rowIdx].cells[7] = new xcNs.WorkbookCell();
    //                 rows[rowIdx].cells[7].value = curExpense.Misc;
    //                 rows[rowIdx].cells[7].style = tableCurrencyStyle;
    //                 rows[rowIdx].cells[8] = new xcNs.WorkbookCell();
    //                 rows[rowIdx].cells[8].value = curExpense.ParkingRate;
    //                 rows[rowIdx].cells[8].style = tableCurrencyStyle;
    //                 rows[rowIdx].cells[9] = new xcNs.WorkbookCell();
    //                 rows[rowIdx].cells[9].value = curExpense.ParkingHours;
    //                 rows[rowIdx].cells[9].style = tableIntegerStyle;
    //                 rows[rowIdx].cells[10] = new xcNs.WorkbookCell();
    //                 rows[rowIdx].cells[10].formula = 'SUM(' + xcNs.Workbook.xlsxAddress(rowIdx, 3) + ':' + xcNs.Workbook.xlsxAddress(rowIdx, 7) + ')+' +
    //                     xcNs.Workbook.xlsxAddress(rowIdx, 8) + '*' + xcNs.Workbook.xlsxAddress(rowIdx, 9);
    //                 rows[rowIdx].cells[10].style = tableCurrencyStyle;
    //             }
        
    //             // Totals row
    //             var totalColumnIndexes = [3, 4, 5, 6, 7, 10];
    //             rows[totalIdx] = new xcNs.WorkbookRow();
    //             rows[totalIdx].cells[1] = new xcNs.WorkbookCell();
    //             rows[totalIdx].cells[1].value = 'Total';
    //             rows[totalIdx].cells[1].style = tableHeaderStyle;
    //             for (var ti in totalColumnIndexes) {
    //                 var ci = totalColumnIndexes[ti];
    //                 rows[totalIdx].cells[ci] = new xcNs.WorkbookCell();
    //                 rows[totalIdx].cells[ci].formula = 'sum(' + xcNs.Workbook.xlsxAddress(firstIdx, ci) + ':' + xcNs.Workbook.xlsxAddress(totalIdx - 1, ci) + ')';
    //                 rows[totalIdx].cells[ci].style = tableFooterCurrencyStyle;
    //             }
    //             rows[totalIdx].cells[8] = new xcNs.WorkbookCell();
    //             rows[totalIdx].cells[8].formula = 'SUMPRODUCT(' + xcNs.Workbook.xlsxAddress(firstIdx, 7) + ':' + xcNs.Workbook.xlsxAddress(totalIdx - 1, 7) + ',' +
    //                 xcNs.Workbook.xlsxAddress(firstIdx, 8) + ':' + xcNs.Workbook.xlsxAddress(totalIdx - 1, 8) + ')';
    //             rows[totalIdx].cells[8].colSpan = 2;
    //             rows[totalIdx].cells[8].style = tableFooterCurrencyStyle;
    //             rows[totalIdx].cells[2] = new xcNs.WorkbookCell();
    //             rows[totalIdx].cells[2].style = tableHeaderStyle;
        
    //             // From/To dates in header, via MAX/MIN formulas on Date field
    //             rows[2].cells[8] = new xcNs.WorkbookCell();
    //             rows[2].cells[8].value = 'PAY PERIOD:';
    //             rows[2].cells[8].style = accentCaptionStyle;
    //             rows[2].cells[9] = new xcNs.WorkbookCell();
    //             rows[2].cells[9].value = 'From';
    //             rows[2].cells[9].style = simpleCaptionStyle;
    //             var datesRange = xcNs.Workbook.xlsxAddress(firstIdx, 1, true) + ':' + xcNs.Workbook.xlsxAddress(totalIdx - 1, 1, true);
    //             rows[2].cells[10] = new xcNs.WorkbookCell();
    //             rows[2].cells[10].formula = 'MIN(' + datesRange + ')';
    //             rows[2].cells[10].style = new xcNs.WorkbookStyle();
    //             rows[2].cells[10].style.format = dateFormat;
    //             rows[3] = new xcNs.WorkbookRow();
    //             rows[3].cells[9] = new xcNs.WorkbookCell();
    //             rows[3].cells[9].value = 'To';
    //             rows[3].cells[9].style = simpleCaptionStyle;
    //             rows[3].cells[10] = new xcNs.WorkbookCell();
    //             rows[3].cells[10].formula = 'MAX(' + datesRange + ')';
    //             rows[3].cells[10].style = new xcNs.WorkbookStyle();
    //             rows[3].cells[10].style.format = dateFormat;
        
    //             //============ Report footer - totals and misc fields
    //             var footerIdx = totalIdx + 1;
    //             rows[footerIdx] = new xcNs.WorkbookRow();
    //             rows[footerIdx].cells[9] = new xcNs.WorkbookCell();
    //             rows[footerIdx].cells[9].value = 'Subtotal';
    //             rows[footerIdx].cells[9].style = totalCaptionStyle;
    //             rows[footerIdx].cells[10] = new xcNs.WorkbookCell();
    //             rows[footerIdx].cells[10].formula = xcNs.Workbook.xlsxAddress(footerIdx + 2, 10) + '-' + xcNs.Workbook.xlsxAddress(footerIdx + 1, 10);
    //             rows[footerIdx].cells[10].style = new xcNs.WorkbookStyle();
    //             rows[footerIdx].cells[10].style.format = xcNs.Workbook.toXlsxNumberFormat('c2');
        
    //             rows[footerIdx + 1] = new xcNs.WorkbookRow();
    //             rows[footerIdx + 1].cells[9] = new xcNs.WorkbookCell();
    //             rows[footerIdx + 1].cells[9].value = 'Cash Advance';
    //             rows[footerIdx + 1].cells[9].style = totalCaptionStyle;
    //             rows[footerIdx + 1].cells[10] = new xcNs.WorkbookCell();
    //             rows[footerIdx + 1].cells[10].value = empl.Advance;
    //             rows[footerIdx + 1].cells[10].style = new xcNs.WorkbookStyle();
    //             rows[footerIdx + 1].cells[10].style.format = xcNs.Workbook.toXlsxNumberFormat('c2');
        
    //             rows[footerIdx + 2] = new xcNs.WorkbookRow();
    //             rows[footerIdx + 2].cells[9] = new xcNs.WorkbookCell();
    //             rows[footerIdx + 2].cells[9].value = 'Total';
    //             rows[footerIdx + 2].cells[9].style = totalCaptionStyle;
    //             rows[footerIdx + 2].cells[10] = new xcNs.WorkbookCell();
    //             rows[footerIdx + 2].cells[10].formula = xcNs.Workbook.xlsxAddress(totalIdx, 10);
    //             rows[footerIdx + 2].cells[10].style = new xcNs.WorkbookStyle();
    //             rows[footerIdx + 2].cells[10].style.format = xcNs.Workbook.toXlsxNumberFormat('c2');
                
    //             rows[footerIdx + 3] = new xcNs.WorkbookRow();
    //             rows[footerIdx + 3].cells[1] = new xcNs.WorkbookCell();
    //             rows[footerIdx + 3].cells[1].value = 'APPROVED:';
    //             rows[footerIdx + 3].cells[1].style = accentCaptionStyle;
    //             rows[footerIdx + 3].cells[4] = new xcNs.WorkbookCell();
    //             rows[footerIdx + 3].cells[4].value = 'NOTES:';
    //             rows[footerIdx + 3].cells[4].style = accentCaptionStyle;
    //         }
        
    //         return book;
    //     }
        
}