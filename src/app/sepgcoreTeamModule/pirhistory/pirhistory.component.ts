import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UserService} from '../../usersModule/user.service'
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pirhistory',
  templateUrl: './pirhistory.component.html',
  styleUrls: ['./pirhistory.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[UserService]
})
export class PirhistoryComponent implements OnInit {

  
  PIRData         : any;
  pages           : number;
  pageSize        : number=5;
  pageNumber      : number;
  rowindex        : number;
  currentIndex    : number;
  pagesIndex      : Array<number>;
  pageStart       : number = 1;
  inputName       : string = '';
  totalPages      : number;
  totalrecords    : number;


  constructor(private httpService:UserService,private _router:Router,private route: ActivatedRoute ) {
    this.pageNumber=1;
    this.rowindex=0;
    this.currentIndex=1;
 
   }

  ngOnInit() {
    this.GetPIRHistory(this.rowindex,this.pageSize);
  }
  caluclateProperties()
  {

    this.totalPages =  Math.ceil((this.totalrecords) / this.pageSize);
    this.pagesIndex =  this.fillArray();
  }
  fillArray(): any{
    var obj = new Array();
    for(var index = this.pageStart; index< this.pageStart +  Math.ceil((this.totalrecords) / this.pageSize) ; index ++) {
                obj.push(index);
    }
    return obj;
  }
  setPage(page)
  {
    this.currentIndex=page;
    this.pageNumber=page;
    this.rowindex=(this.currentIndex-1)*this.pageSize
    this.GetPIRHistory(this.rowindex,this.pageSize);
  }

  nextPage()
  {
    this.currentIndex++;
    this.pageNumber++;
    this.rowindex=(this.currentIndex-1)*this.pageSize
    this.GetPIRHistory(this.rowindex,this.pageSize);
  }
  prevPage()
  {
    this.currentIndex--;
    this.pageNumber--;
    this.rowindex=(this.currentIndex-1)*this.pageSize
    this.GetPIRHistory(this.rowindex,this.pageSize);
  }
  // edit(item)
  // {
  //   console.log(item.pir_id);
  // }
  GetPIRHistory(rowindex:number,pageSize:number)
  {
    this.httpService.GetAllPIRHistory(rowindex,pageSize).subscribe(
        response=> {
         
          console.log("VALUE RECEIVED: ",response[0]);
          this.PIRData=response[0];
          if(this.PIRData.length>=0)
          {
            this.totalrecords=this.PIRData[0].totalrecords
          }
          this.caluclateProperties();
         
          },
        error=> {
            console.log("ERROR: ",error);
            console.log(error.json()); //gives the object object
        },
        () => {
            console.log("Completed");
        }
    );
  }
  
}
