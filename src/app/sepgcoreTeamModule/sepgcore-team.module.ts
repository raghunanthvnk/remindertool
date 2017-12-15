import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SepglayoutComponent } from './sepglayout/sepglayout.component';


//In order to be able to use two-way data binding for form inputs you need to import theFormsModule package in your Angular module
import { FormsModule, FormGroup,FormControl,Validators,FormBuilder,ReactiveFormsModule } from '@angular/forms'; 
// for http req and res we use below module
import { HttpModule,BaseRequestOptions } from '@angular/http';


import { SepgComponent } from './sepg.component';

import { RouterModule, Routes } from '@angular/router';
import { PirhistoryComponent } from './pirhistory/pirhistory.component';
import { PirmodificationComponent } from './pirmodification.component';



// in dashboard module
const SEPGRoutes: Routes = [
  {path: '', component: SepglayoutComponent},
  {path: 'SEPGLayout', component: SepglayoutComponent,
                       children:[{ path: 'SEPG', component: SepgComponent },
                                {path:'PIRHistory',component:PirhistoryComponent},
                                {path:'PIRModification',component:PirmodificationComponent},
                                {path:'PIRModification/:id',component:PirmodificationComponent}]
           
  }
];


export const SEPGRouting = RouterModule.forChild(SEPGRoutes);

@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(SEPGRoutes), FormsModule,HttpModule
  ],
  declarations: [SepglayoutComponent,SepgComponent, PirhistoryComponent, PirmodificationComponent],
  bootstrap:[SepglayoutComponent]
})
export class SepgcoreTeamModule { }
