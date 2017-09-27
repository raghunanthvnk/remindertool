"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var LayoutComponent = (function () {
    function LayoutComponent() {
        this.isIn = false; // store state
    }
    LayoutComponent.prototype.toggleState = function () {
        var bool = this.isIn;
        this.isIn = bool === false ? true : false;
    };
    return LayoutComponent;
}());
LayoutComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './Layout.html',
    })
], LayoutComponent);
exports.LayoutComponent = LayoutComponent;
//# sourceMappingURL=Layout.Component.js.map