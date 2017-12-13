import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersLayoutComponent } from './users-layout/users-layout.component';
import { PirComponent } from './pir/pir.component';
//In order to be able to use two-way data binding for form inputs you need to import theFormsModule package in your Angular module
import { FormsModule, FormGroup,FormControl,Validators,FormBuilder,ReactiveFormsModule } from '@angular/forms'; 
// for http req and res we use below module
import { HttpModule,BaseRequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../usersModule/user.service';

// in dashboard module
const UserRoutes: Routes = [
  {path: '', component: UsersLayoutComponent},
  {path: 'USERLayout', component: UsersLayoutComponent,
                       children:[{ path: 'PIR', component: PirComponent },
                                 { path: 'PIR/:id', component: PirComponent }]
           
  }
];

export const USERRouting = RouterModule.forChild(UserRoutes);

@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(UserRoutes), FormsModule,HttpModule
  ],
  declarations: [UsersLayoutComponent, PirComponent],
  providers: [
    UserService
  ],
  bootstrap:[UsersLayoutComponent]
})
export class UsersModule { }
