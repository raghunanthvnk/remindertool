import { Component } from '@angular/core';


@Component ({  

   selector: 'my-app',  
   templateUrl:'./Layout.html',
   styleUrls:['../css/footer.css']
  
})  
export class LayoutComponent {  
    isIn = false;   // store state
    toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false; 
    }
} 