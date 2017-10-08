import {Component,OnInit ,OnChanges,Pipe, PipeTransform} from '@angular/core';
// import {IMyDpOptions} from 'mydatepicker';
import {HttpService} from '../services//http.service';
import { AppModule } from '../app.module';  
// *import the service and project model which contains properties for holding the data  
import { serviceLine } from '../models/serviceLine';  
import { projectFields } from '../models/projectFields';  





@Component({
  selector: 'sport-app',
  styleUrls:['../css/home.css'],
  templateUrl:'./SpotCheckStatus.html',
  providers:[HttpService]
  
})
export class SpotCheckStatusComponent  implements OnInit
{
     name = 'SpotCheckStatus'; 
     
     public serviceList: serviceLine[]; // create a variable of type serviceLine object 
     public projectFields: projectFields[]; // create a variable of type projectFields object 
     public projectFieldsdtl:any;
     public ActivityNames:any;
     public SubActivityDates:any;
     public SCDetails:any;
     public btnSubmitText:string="Submit"
     public SuccessMessage:string="";
     public divhide:boolean=true;
     msgdisplay = "hide";
    // datepicker package inherited from https://github.com/kekeh/mydatepicker  for functioning of datepicker
    //and register in system.js file and app.module file and import here
    //  private myDatePickerOptions: IMyDpOptions = {
    //   // other options...
    //   dateFormat: 'dd.mm.yyyy',
    // };
  // Initialized to specific date (09.10.2018).
   public model: Object = { date: { year: 2018, month: 10, day: 9 } };

  constructor(private httpService: HttpService ,) {
    this.projectFieldsdtl = {};
    this.SCDetails={};
  }

  ngOnInit(){
   
  

  this.httpService.getServiceLinedtl().subscribe(
                    response=> {
                      this.serviceList=response[1];
                      console.log("VALUE RECEIVED: ",response[1]);
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
    filterChanged(selectedValue:string){
      console.log('value is ',selectedValue);
      this.getProjectCodes(selectedValue);
    }
    projectCodeChanged(selectedValue:string){
      console.log('value is ',selectedValue);
      this.getProjectDetails(selectedValue);
    }
    getProjectCodes(serviceline:string)
    {  

      this.httpService.getProjectCode(serviceline).subscribe(
          response=> {
            
            var projectdtl=response[1];
            this.projectFields=projectdtl;
            console.log("VALUE RECEIVED: ",response[1]);
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
    
    getProjectDetails(projectCode:string)
    {  
      this.projectFieldsdtl= (this.projectFields.filter(x => x.PROJECT_CODE === projectCode))[0];
      console.log(this.projectFieldsdtl);
    }

    getActivityNames()
    {  

      this.httpService.getActivityNames().subscribe(
          response=> {
            
            
            this.ActivityNames=response[1];
            console.log("VALUE RECEIVED: ",response[1]);
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
    
 

    radiobtnopted(selectedValue:any)
    {
      
      this.btnSubmitText=selectedValue;
      this.getActivityNames();
      
    }
    ddlActivityNamesChanged(selectedValue:string){
      console.log('Activity Name is ',selectedValue);
      console.log('Project Code is ',this.projectFieldsdtl.PROJECT_CODE);
      this.getSubActivityDates(selectedValue,this.projectFieldsdtl.PROJECT_CODE);
    }
    
    getSubActivityDates(ActivityName:string,Project_code:string)
    {  

      this.httpService.getSubActivityDates(ActivityName,Project_code).subscribe(
          response=> {
            this.SubActivityDates=response[1];
            console.log("VALUE RECEIVED: ",response[1]);
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
    
    ddlSubActivityChanged(selectedValue:string){
      console.log('Sub Activity DATE is ',selectedValue);
      this.GetSpotCheckDetailsforProject(selectedValue)
    }

    GetSpotCheckDetailsforProject(ActivityId:string)
    {  

      this.httpService.GetSpotCheckDetailsforProject(ActivityId).subscribe(
          response=> {
            this.SCDetails=response[1][0];
            
             var dtdate:Date;
             var date= new Date(this.SCDetails.EXPECTED_CLOSURE_DATE);
             var date1= new Date(this.SCDetails.ACTUAL_CLOSURE_DATE);
             
             this.SCDetails.EXPECTED_CLOSURE_DATE=date.getFullYear()+'-'+("0" + (date.getMonth()+1)).slice(-2)+'-'+("0" + date.getDate()).slice(-2);
             this.SCDetails.ACTUAL_CLOSURE_DATE=date1.getFullYear()+'-'+("0" + (date1.getMonth()+1)).slice(-2)+'-'+("0" + date1.getDate()).slice(-2);

            console.log("VALUE RECEIVED: ",response[1][0]);
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

    btnSubmit()
    {
      console.log("button clicked");
      debugger;
      var mode:string=this.btnSubmitText;
      var project_code:string=this.projectFieldsdtl.PROJECT_CODE;

       if(this.SCDetails.REMINDER_ACTIVE==true)
        {
          this.SCDetails.REMINDER_ACTIVE=1
        }
        else
          {
          this.SCDetails.REMINDER_ACTIVE=0
          }
      var data:any=this.SCDetails;
      var activity=this.ActivityNames;
      
      console.log(data);
      this.httpService.AddSpotCheckDetails(mode,project_code,data,activity).subscribe(
        response=> {
          
          console.log("VALUE RECEIVED: ",response);
          this.divhide=false
          this.SuccessMessage="Data "+this.btnSubmitText+ " Successfully";
          this.SCDetails='';

          

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
