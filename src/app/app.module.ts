import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule }    from '@angular/common';
//In order to be able to use two-way data binding for form inputs you need to import theFormsModule package in your Angular module
import { FormsModule, FormGroup,FormControl,Validators,FormBuilder,ReactiveFormsModule } from '@angular/forms'; 
// for http req and res we use below module
import { HttpModule } from '@angular/http';
 // datepicker package inherited from https://github.com/kekeh/mydatepicker  for functioning of datepicker
 //and register in system.js file and app.module file
//  import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from './Layout/Layout.Component';
import {ExcelDownloadComponent} from './ExcelDownload/ExcelDownload.Component';
import {ExcelUploadComponent} from './ExcelUpload/ExcelUpload.Component';
import {SpotCheckStatusComponent} from './spotCheck/spotcheckstatus.component';
import {PageNotFoundComponent} from './others/PageNotFoundComponent';

import {  Component } from '@angular/core';
// import {UPLOAD_DIRECTIVES} from 'ng2-file-uploader/ng2-file-uploader';

import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';



const appRoutes: Routes = [
  { path: 'SPOTCHECK', component: SpotCheckStatusComponent },
  { path: 'ExcelDownalod', component: ExcelDownloadComponent },
  { path: 'ExcelUpload', component: ExcelUploadComponent },
  { path: '**', component: PageNotFoundComponent } 
];


@NgModule({
  declarations:[ AppComponent,SpotCheckStatusComponent,PageNotFoundComponent,LayoutComponent,
    ExcelDownloadComponent,ExcelUploadComponent,ExcelDownloadComponent
    ,FileDropDirective, FileSelectDirective ],
  imports:    [ BrowserModule , FormsModule,HttpModule,ReactiveFormsModule,
    RouterModule.forRoot(appRoutes) ],
  providers: [],
  bootstrap: [LayoutComponent]
  

})
export class AppModule { }
