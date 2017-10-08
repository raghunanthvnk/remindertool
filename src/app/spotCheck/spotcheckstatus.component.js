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
var core_1 = require("@angular/core");
var http_service_1 = require("./http.service");
var SpotCheckStatusComponent = (function () {
    function SpotCheckStatusComponent(httpService) {
        this.httpService = httpService;
        this.name = 'SpotCheckStatus';
        this.btnSubmitText = "Submit";
        this.SuccessMessage = "";
        this.msgdisplay = "hide";
        // datepicker package inherited from https://github.com/kekeh/mydatepicker  for functioning of datepicker
        //and register in system.js file and app.module file and import here
        this.myDatePickerOptions = {
            // other options...
            dateFormat: 'dd.mm.yyyy',
        };
        // Initialized to specific date (09.10.2018).
        this.model = { date: { year: 2018, month: 10, day: 9 } };
        this.projectFieldsdtl = {};
        this.SCDetails = {};
    }
    SpotCheckStatusComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.httpService.getServiceLinedtl().subscribe(function (response) {
            _this.serviceList = response[1];
            console.log("VALUE RECEIVED: ", response[1]);
        }, function (error) {
            console.log("ERROR: ", error);
            console.log(error.json()); //gives the object object
        }, function () {
            console.log("Completed");
        });
    };
    SpotCheckStatusComponent.prototype.filterChanged = function (selectedValue) {
        console.log('value is ', selectedValue);
        this.getProjectCodes(selectedValue);
    };
    SpotCheckStatusComponent.prototype.projectCodeChanged = function (selectedValue) {
        console.log('value is ', selectedValue);
        this.getProjectDetails(selectedValue);
    };
    SpotCheckStatusComponent.prototype.getProjectCodes = function (serviceline) {
        var _this = this;
        this.httpService.getProjectCode(serviceline).subscribe(function (response) {
            var projectdtl = response[1];
            _this.projectFields = projectdtl;
            console.log("VALUE RECEIVED: ", response[1]);
        }, function (error) {
            console.log("ERROR: ", error);
            console.log(error.json()); //gives the object object
        }, function () {
            console.log("Completed");
        });
    };
    SpotCheckStatusComponent.prototype.getProjectDetails = function (projectCode) {
        this.projectFieldsdtl = (this.projectFields.filter(function (x) { return x.PROJECT_CODE === projectCode; }))[0];
        console.log(this.projectFieldsdtl);
    };
    SpotCheckStatusComponent.prototype.getActivityNames = function () {
        var _this = this;
        this.httpService.getActivityNames().subscribe(function (response) {
            _this.ActivityNames = response[1];
            console.log("VALUE RECEIVED: ", response[1]);
        }, function (error) {
            console.log("ERROR: ", error);
            console.log(error.json()); //gives the object object
        }, function () {
            console.log("Completed");
        });
    };
    SpotCheckStatusComponent.prototype.radiobtnopted = function (selectedValue) {
        this.btnSubmitText = selectedValue;
        this.getActivityNames();
    };
    SpotCheckStatusComponent.prototype.ddlActivityNamesChanged = function (selectedValue) {
        console.log('Activity Name is ', selectedValue);
        console.log('Project Code is ', this.projectFieldsdtl.PROJECT_CODE);
        this.getSubActivityDates(selectedValue, this.projectFieldsdtl.PROJECT_CODE);
    };
    SpotCheckStatusComponent.prototype.getSubActivityDates = function (ActivityName, Project_code) {
        var _this = this;
        this.httpService.getSubActivityDates(ActivityName, Project_code).subscribe(function (response) {
            _this.SubActivityDates = response[1];
            console.log("VALUE RECEIVED: ", response[1]);
        }, function (error) {
            console.log("ERROR: ", error);
            console.log(error.json()); //gives the object object
        }, function () {
            console.log("Completed");
        });
    };
    SpotCheckStatusComponent.prototype.ddlSubActivityChanged = function (selectedValue) {
        console.log('Sub Activity DATE is ', selectedValue);
        this.GetSpotCheckDetailsforProject(selectedValue);
    };
    SpotCheckStatusComponent.prototype.GetSpotCheckDetailsforProject = function (ActivityId) {
        var _this = this;
        this.httpService.GetSpotCheckDetailsforProject(ActivityId).subscribe(function (response) {
            _this.SCDetails = response[1][0];
            var dtdate;
            var date = new Date(_this.SCDetails.EXPECTED_CLOSURE_DATE);
            var date1 = new Date(_this.SCDetails.ACTUAL_CLOSURE_DATE);
            _this.SCDetails.EXPECTED_CLOSURE_DATE = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDay()).slice(-2);
            _this.SCDetails.ACTUAL_CLOSURE_DATE = date1.getFullYear() + '-' + ("0" + (date1.getMonth() + 1)).slice(-2) + '-' + ("0" + date1.getDay()).slice(-2);
            console.log("VALUE RECEIVED: ", response[1][0]);
        }, function (error) {
            console.log("ERROR: ", error);
            console.log(error.json()); //gives the object object
        }, function () {
            console.log("Completed");
        });
    };
    SpotCheckStatusComponent.prototype.btnSubmit = function () {
        var _this = this;
        console.log("button clicked");
        var mode = this.btnSubmitText;
        var project_code = this.projectFieldsdtl.PROJECT_CODE;
        if (this.SCDetails.REMINDER_ACTIVE == true) {
            this.SCDetails.REMINDER_ACTIVE = 1;
        }
        else {
            this.SCDetails.REMINDER_ACTIVE = 0;
        }
        var data = this.SCDetails;
        var activity = this.ActivityNames;
        console.log(data);
        this.httpService.AddSpotCheckDetails(mode, project_code, data, activity).subscribe(function (response) {
            console.log("VALUE RECEIVED: ", response);
            _this.SuccessMessage = "Data" + _this.btnSubmitText + "Successfully";
        }, function (error) {
            console.log("ERROR: ", error);
            console.log(error.json()); //gives the object object
        }, function () {
            console.log("Completed");
        });
    };
    return SpotCheckStatusComponent;
}());
SpotCheckStatusComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        styleUrls: ['/css/home.css'],
        templateUrl: './SpotCheckStatus.html',
        providers: [http_service_1.HttpService]
    }),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], SpotCheckStatusComponent);
exports.SpotCheckStatusComponent = SpotCheckStatusComponent;
//# sourceMappingURL=spotcheckstatus.component.js.map