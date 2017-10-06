import { Component ,OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-module-selector',
  templateUrl: './module-selector.component.html',
  styleUrls: ['../css/style.css','../css/responsive.css']
  
})
export class ModuleSelectorComponent  implements OnInit  {

  constructor(private _router:Router,private route: ActivatedRoute  ) { }
 
  ngOnInit()
  {

  }
  

  qualityrd():void
  {
    this._router.navigate(['/SPOTCHECK']);
  }

}
