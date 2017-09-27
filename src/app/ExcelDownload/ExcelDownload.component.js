"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FileSaver = require("file-saver");
var XLSX = require("xlsx");
// import * as wjcXlsx from 'wijmo/wijmo.xlsx';
// import { exportExpenseReport } from './expenseReportExport';
var core_1 = require("@angular/core");
var http_service_1 = require("../http.service");
// import { utils, write, WorkBook } from 'xlsx';
// import { saveAs } from 'file-saver';
var EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
var EXCEL_EXTENSION = '.xlsx';
require("rxjs/Rx");
var ExcelDownloadComponent = (function () {
    function ExcelDownloadComponent(httpService) {
        this.httpService = httpService;
        this.title = 'app';
        this.table = [
            {
                First: 'one',
                Second: 'two',
                Third: 'three',
                Forth: 'four',
                Fifth: 'five'
            },
            {
                First: 'un',
                Second: 'deux',
                Third: 'trois',
                Forth: 'quatre',
                Fifth: 'cinq'
            },
        ];
    }
    ExcelDownloadComponent.prototype.exportAsExcelFile = function (json, excelFileName) {
        var worksheet = XLSX.utils.json_to_sheet(json);
        var workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        var excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    };
    ExcelDownloadComponent.prototype.saveAsExcelFile = function (buffer, fileName) {
        var data = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    };
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
    ExcelDownloadComponent.prototype.GetRemindersData = function () {
        var _this = this;
        var Flag = "ALL_SPOTCHECK_RECORDS";
        this.httpService.GetRemindersData(Flag).subscribe(function (data) { return _this.exportAsExcelFile((data[1]), "Spot_Check"); }, function (error) { return console.log("Error downloading the file."); }, function () { return console.info("OK"); });
    };
    ExcelDownloadComponent.prototype.downloadFile = function (data) {
        console.log(data);
        var blob = new Blob([data], { type: 'application/vnd.ms-excel' });
        var url = window.URL.createObjectURL(blob);
        window.open(url);
        // var workbook = <wjcXlsx.Workbook>this.exportExpenseReport(data);
        //var xlsx = wijmo.xlsx.XlsxConverter.exportToFile(workbook, 'ExpenseReport.xlsx');
        //workbook.save('ExpenseReport.xlsx');
    };
    return ExcelDownloadComponent;
}());
ExcelDownloadComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './excelDownload.html',
        providers: [http_service_1.HttpService]
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], ExcelDownloadComponent);
exports.ExcelDownloadComponent = ExcelDownloadComponent;
//# sourceMappingURL=ExcelDownload.Component.js.map