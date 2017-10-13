import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


import { RouterModule, Routes } from '@angular/router';
import { FormsModule, FormGroup,FormControl,Validators,FormBuilder,ReactiveFormsModule } from '@angular/forms'; 
// for http req and res we use below module
import { HttpModule,BaseRequestOptions } from '@angular/http';
import {  Component } from '@angular/core';
// import {UPLOAD_DIRECTIVES} from 'ng2-file-uploader/ng2-file-uploader';

// import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import {LayoutComponent} from './Layout/Layout.Component';
import {ExcelDownloadComponent} from './ExcelDownload/ExcelDownload.Component';
import {ExcelUploadComponent} from './ExcelUpload/ExcelUpload.Component';
import {SpotCheckStatusComponent} from './spotCheck/spotcheckstatus.component';
import {LogoutComponent} from './logout.component';
import { AuthGuardService } from './services/auth-guard.service';


// in dashboard module
const QualityRoutes: Routes = [
  {path: '', component: LayoutComponent},
  {path: 'QualityLayout', component: LayoutComponent,
  children:[
    { path: 'SPOTCHECK', component: SpotCheckStatusComponent},
    { path: 'ExcelDownalod', component: ExcelDownloadComponent },
    { path: 'ExcelUpload', component: ExcelUploadComponent},
    { path: 'Logout', component: LogoutComponent}
           ]
           
  }
];

export const QualityRouting = RouterModule.forChild(QualityRoutes);


@NgModule({

  imports: [
    CommonModule,FileUploadModule,FormsModule,RouterModule.forChild(QualityRoutes)
  ],
  declarations: [LayoutComponent,
    ExcelDownloadComponent,ExcelUploadComponent,SpotCheckStatusComponent,LogoutComponent],
  providers:[AuthGuardService],
  bootstrap:[LayoutComponent]

})
export class QualityModule { }
