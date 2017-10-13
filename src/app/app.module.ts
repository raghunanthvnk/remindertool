import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule }    from '@angular/common';
//In order to be able to use two-way data binding for form inputs you need to import theFormsModule package in your Angular module
import { FormsModule, FormGroup,FormControl,Validators,FormBuilder,ReactiveFormsModule } from '@angular/forms'; 
// for http req and res we use below module
import { HttpModule,BaseRequestOptions } from '@angular/http';
 // datepicker package inherited from https://github.com/kekeh/mydatepicker  for functioning of datepicker
 //and register in system.js file and app.module file
//  import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
// import {LayoutComponent} from './Layout/Layout.Component';
// import {ExcelDownloadComponent} from './ExcelDownload/ExcelDownload.Component';
// import {ExcelUploadComponent} from './ExcelUpload/ExcelUpload.Component';
// import {SpotCheckStatusComponent} from './spotCheck/spotcheckstatus.component';
import {PageNotFoundComponent} from './others/PageNotFoundComponent';

import {  Component } from '@angular/core';
// import {UPLOAD_DIRECTIVES} from 'ng2-file-uploader/ng2-file-uploader';

// import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { ModuleSelectorComponent } from './module-selector/module-selector.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

//Login ref:  http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';

import { QualityModule }    from './quality.module';
import { PmoModule }    from './pmo module/pmo.module';
import { SepgcoreTeamModule } from './sepgcoreTeamModule/sepgcore-team.module';


const appRoutes: Routes = [
  // { path: 'SPOTCHECK', component: SpotCheckStatusComponent },
  // { path: 'ExcelDownalod', component: ExcelDownloadComponent },
  // { path: 'ExcelUpload', component: ExcelUploadComponent },
  
  // { path: 'QualityLayout', component: LayoutComponent},
  {
    path: 'qualitydashboard',
    loadChildren: 'app/quality.module#QualityModule',
    canActivate: [AuthGuardService]
  },

  {
    path: 'sepgdashboard',
    loadChildren: 'app/sepgcoreTeamModule/sepgcore-team.module#SepgcoreTeamModule',
    canActivate: [AuthGuardService]
  },


  { path: 'ModuleSelector', component: ModuleSelectorComponent,canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component:ModuleSelectorComponent ,canActivate: [AuthGuardService]},
  { path: '**', component: PageNotFoundComponent } 
];


@NgModule({
  declarations:[ AppComponent,PageNotFoundComponent
    , ModuleSelectorComponent, LoginComponent, RegisterComponent ],
  imports:    [ BrowserModule ,FileUploadModule, FormsModule,HttpModule,ReactiveFormsModule,
    RouterModule.forRoot(appRoutes) ],
  providers: [
    AuthGuardService,
    AlertService,
    AuthenticationService,
    UserService,
    BaseRequestOptions],
  bootstrap: [AppComponent],
  exports:[RouterModule]
  

})
export class AppModule { }
