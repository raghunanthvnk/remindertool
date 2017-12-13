import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UserService} from '../user.service'
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pir',
  templateUrl: './pir.component.html',
  styleUrls: ['./pir.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PirComponent implements OnInit {

  public PIRDetails:any;
  public mode:string;
  public SuccessMessage:string="";
  public SuccessMessagehide :boolean=true;
  loading = false;
  public pir_guid:any
  public fields_disabled:boolean;

  constructor(private httpService:UserService,private _router:Router,private route: ActivatedRoute ) {
    this.PIRDetails={};
   }

  ngOnInit() {

    this.pir_guid= this.route.snapshot.params['id'];
    console.log(this.pir_guid);
    if(this.pir_guid)
    {
    this.fields_disabled=true;
    this.GetPIRDetailsById(this.pir_guid);
    this.mode="UPDATE"
    }
    else{
    this.mode="ADD"
    this.setDefaultVlaues();
    }
  }
  setDefaultVlaues(){
     //Initialize the default values
     var date= new Date();
     this.PIRDetails.InitiatorDate=date.getFullYear()+'-'+("0" + (date.getMonth()+1)).slice(-2)+'-'+("0" + date.getDate()).slice(-2);
     this.PIRDetails.Status=2;
     var fields_disabled=false;
  }
  btnReset(){
    this.PIRDetails={};
    this.setDefaultVlaues();
  }
  btnSubmit()
  {
    this.loading=true;
    this.httpService.PIRSubmit(this.mode,this.PIRDetails).subscribe(
      response=> {
        //this.btnReset();
        console.log("VALUE RECEIVED: ",response);
        this.SuccessMessagehide=false;
        this.SuccessMessage="PIR Data Submitted Successfully";
        
        },
      error=> {
          console.log("ERROR: ",error);
          console.log(error.json()); //gives the object object
          this.loading=false;
      },
      () => {
          console.log("Completed");
          this.loading=false;
      }
    );
  }
  GetPIRDetailsById(pir_guid:any)
  {
 
    this.httpService.GetPIRHistorybyID(pir_guid).subscribe(
      response=> {
        //this.btnReset();
        console.log("VALUE RECEIVED: ",response[0][0]);
        this.PIRDetails=response[0][0];
        var date= new Date(this.PIRDetails.initiator_date);
        this.PIRDetails.initiator_date=date.getFullYear()+'-'+("0" + (date.getMonth()+1)).slice(-2)+'-'+("0" + date.getDate()).slice(-2);
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
