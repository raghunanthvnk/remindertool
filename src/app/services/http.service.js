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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
// Import RxJs required methods
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
        this.BASE_URL = 'http://localhost:5000/serviceline_dtl';
        this.projectcodedtl_URL = 'http://localhost:5000/project_codes_dtl?ServiceLine=';
        this.activityname_URL = 'http://localhost:5000/ActivityNames_Get';
    }
    HttpService.prototype.getServiceLinedtl = function () {
        return this.http.get("" + this.BASE_URL)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    HttpService.prototype.getProjectCode = function (serviceline) {
        return this.http.get("" + (this.projectcodedtl_URL + serviceline))
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    HttpService.prototype.getActivityNames = function () {
        return this.http.get("" + this.activityname_URL)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    HttpService.prototype.getSubActivityDates = function (ActivityName, Project_code) {
        var subactivity_URL = 'http://localhost:5000/SUBACTIVITY_GET/?ActivityName=' + ActivityName + '&Project_code=' + Project_code;
        return this.http.get("" + subactivity_URL)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    HttpService.prototype.GetSpotCheckDetailsforProject = function (ActivityId) {
        var SCDetails_URL = 'http://localhost:5000/SpotCheckDetailsforProject_GET/?ActivityId=' + ActivityId;
        return this.http.get("" + SCDetails_URL)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    HttpService.prototype.AddSpotCheckDetails = function (mode, project_code, data, activity) {
        var AddSpotCheckDetails_URL = 'http://localhost:5000/api/UpdateSpotCheckDetails/?ProjectCode=' + project_code + '&mode=' + mode;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var body = JSON.stringify({ spot_check_details: data, activity: activity });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post("" + AddSpotCheckDetails_URL, body, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    HttpService.prototype.GetRemindersData = function (Flag) {
        var GetRemindersData_URL = 'http://localhost:5000/api/RemindersData/?Flag=' + Flag;
        return this.http.get("" + GetRemindersData_URL)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
        // return this.http.get(`${GetRemindersData_URL}`,{responseType: ResponseContentType.Blob }).map(
        //     (res) => {
        //         console.log(res);
        //         return new Blob([res.blob()], { type: 'application/vnd.ms-excel' })
        //     })
    };
    HttpService.prototype.deleteUser = function (usersID) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
        });
        return this.http.delete("" + this.BASE_URL + usersID, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    HttpService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    HttpService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    return HttpService;
}());
HttpService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HttpService);
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map