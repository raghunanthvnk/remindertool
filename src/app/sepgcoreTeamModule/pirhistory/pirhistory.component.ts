import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UserService} from '../../usersModule/user.service'
import { Router ,ActivatedRoute} from '@angular/router';
//npm install xlsx  --save ,  npm install file-saver --save 
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import 'rxjs/Rx' ;
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


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
  downalodedfilename :string;


  constructor(private httpService:UserService,private _router:Router,private route: ActivatedRoute ) {
    this.pageNumber=1;
    this.rowindex=0;
    this.currentIndex=1;
 
   }

  ngOnInit() {
    this.GET_PIR_RECORDS_FORDT(this.rowindex,this.pageSize);
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
    this.GET_PIR_RECORDS_FORDT(this.rowindex,this.pageSize);
  }

  nextPage()
  {
    this.currentIndex++;
    this.pageNumber++;
    this.rowindex=(this.currentIndex-1)*this.pageSize
    this.GET_PIR_RECORDS_FORDT(this.rowindex,this.pageSize);
  }
  prevPage()
  {
    this.currentIndex--;
    this.pageNumber--;
    this.rowindex=(this.currentIndex-1)*this.pageSize
    this.GET_PIR_RECORDS_FORDT(this.rowindex,this.pageSize);
  }
  // edit(item)
  // {
  //   console.log(item.pir_id);
  // }
  GET_PIR_RECORDS_FORDT(rowindex:number,pageSize:number)
  {
    this.httpService.GET_PIR_RECORDS_FORDT(rowindex,pageSize).subscribe(
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
  DownalodPIRData()
    {
      this.httpService.GetAllPIRHistory().subscribe(
        response=> {
          console.log("VALUE RECEIVED: ",response);
            if(response.length>0)
            {
              console.log(response[1]);
              var displayDate = new Date().toLocaleDateString();
              this.downalodedfilename= "PIR Data "+displayDate
              this.exportAsExcelFile(response[0],response[1], this.downalodedfilename)
            }
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
   public exportAsExcelFile(json: any[],json1: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json1);
    const workbook: XLSX.WorkBook = { Sheets: { 'PIR History': worksheet,'Aggregate  Counts': worksheet1 }, SheetNames: ['PIR History','Aggregate  Counts'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
  }

   
  
}
