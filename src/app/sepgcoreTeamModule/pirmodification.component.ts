import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService} from '../usersModule/user.service'
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pirmodification',
  templateUrl: './pirmodification.component.html',
  styles: ['.SuccessMessagehide{display: none;}'],
  styleUrls: ['../css/index.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[UserService]
})
export class PirmodificationComponent implements OnInit {


  public PIRDetails:any;
  public mode:string="UPDATE";
  public SuccessMessage:string="";
  public SuccessMessagehide :boolean=true;
  public loading = false;
  public searchloading = false;
  public searchMessage:any
  public pir_guid:any
  public fields_disabled:boolean;
  public SearchbyID:any
  public stopBusyConent:boolean=true;
  constructor(private httpService:UserService,private _router:Router,private route: ActivatedRoute ) {
    this.PIRDetails={};
   }
  ngOnInit() {

    this.pir_guid= this.route.snapshot.params['id'];
    this.setDefaultVlaues();
    console.log(this.pir_guid);
    if(this.pir_guid || this.pir_guid!=undefined)
    {
    this.stopBusyConent=false;
    this.GetPIRDetailsById(this.pir_guid);
    }
  }
  FilterByNameID()
  {
    this.stopBusyConent=false;
    this.searchloading=true
    console.log(this.SearchbyID);
    this.GetPIRDetailsById(this.SearchbyID);
  }
  setDefaultVlaues(){
     //Initialize the default values
     var date= new Date();
    //  this.PIRDetails.initiator_date=date.getFullYear()+'-'+("0" + (date.getMonth()+1)).slice(-2)+'-'+("0" + date.getDate()).slice(-2);
    //  this.PIRDetails.status=2;
     this.fields_disabled=true;
  }
  btnReset(){
    this.PIRDetails.initiator_name='';
    this.PIRDetails.email_address='';
    this.PIRDetails.proposed_details='';
    this.PIRDetails.reason='';
    this.PIRDetails.remarks='';
    this.PIRDetails.comments='';
  }
  btnSubmit()
  {
    this.loading=true;
    this.httpService.PIRSubmit(this.mode,this.PIRDetails).subscribe(
      response=> {
        //this.btnReset();
        console.log("VALUE RECEIVED: ",response);
        this.SuccessMessagehide=false;
        this.SuccessMessage="PIR Data Updated Successfully";
        },
      error=> {
          console.log("ERROR: ",error);
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
        if(response=='Please Enter Correct ID')
        {
          this.searchMessage='Please Enter Correct ID';
        }
        else
        {
          this.searchMessage='';
          this.PIRDetails=response[0][0];
          var date= new Date(this.PIRDetails.initiator_date);
          this.PIRDetails.initiator_date=date.getFullYear()+'-'+("0" + (date.getMonth()+1)).slice(-2)+'-'+("0" + date.getDate()).slice(-2);
        }
      },
      error=> {
          console.log("ERROR: ",error);
          this.searchMessage='Please Enter Correct ID';
          this.stopBusyConent=true;
      },
      () => {
          this.searchloading=false
          this.stopBusyConent=true;
      }
    );
  }

}
