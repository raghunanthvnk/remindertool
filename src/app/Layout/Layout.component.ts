import { Component } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

import { User} from '../models/user'

@Component ({  

   selector: 'layout-app',  
   templateUrl:'./Layout.html',
   styleUrls:['../css/footer.css']
  
})  
export class LayoutComponent { 
    
   public path:any;
   public session_user:any;
   public is_quality:any=false;
   public is_sepg:any=false;
   public is_pmo:any=false;

    constructor(location: Location,private _router:Router,private route: ActivatedRoute  ) {
     
     
        

     }
    isIn = false;   // store state
    toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false; 
    }

    
    ngOnInit() {
      
        this.path=window.location.href;
        console.log(this.path);

        if (localStorage.getItem('currentUser')) {
            // logged in so return true

             
             this.session_user = JSON.parse(localStorage.getItem('currentUser'));
             console.log(this.session_user);
           
        }
        
    }
   
} 