import { Component, OnInit } from '@angular/core';

import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '',
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor( private router: Router,) { }

  ngOnInit() {
   
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);

  }

}
