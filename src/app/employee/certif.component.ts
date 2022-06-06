import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsService } from '../services/requests.service';
import { Request, Requests } from '../models/request.model';
import { Employee } from '../models/employee.model';
import { requestTableEmployee } from '../models/tables.model';
import * as file from 'file-saver';
import { SharedService } from '../services/shared.service';


const ELEMENT_DATA: requestTableEmployee[] = [];

@Component({
  selector: 'app-certif',
  templateUrl: './certif.component.html',
  styleUrls: ['./certif.component.css']
})
export class CertifComponent implements OnInit , AfterViewInit {

  promptDisplay : boolean = false;
  displayedColumns: string[] = ['n', 'sent_date', 'status','download'];
  dataSource = new MatTableDataSource<requestTableEmployee>(ELEMENT_DATA);
  certifType : string ;
  constructor(private snackbar: MatSnackBar,private sharedService : SharedService ,private employeeService : EmployeeService ,private route: ActivatedRoute, private requestService : RequestsService , private router : Router) { }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.sharedService.initializeAppLanguage();

    //get route
    this.route.params.subscribe(params => {
      if (params.type != "work" && params.type != "internship") {
        this.router.navigate(['404']);
      }else{
        this.certifType = params.type;
        this.getRequests();
      }
    });
  }

  getRequests(){
    this.employeeService.getRequests(this.certifType).subscribe(
      (res: Requests) => {
        this.dataSource.data = res.request.map((res:Request,index:number) =>{
          return {
            n: index + 1,
            sent_date: res.sent_date,
            status: res.status,
            file : res.file
          }
        })
      }
    );
  }

  sendRequest(){
    this.employeeService.getEmployeeById().subscribe((res : Employee) =>{
      //add type to res
      res.type = this.certifType;     
      this.employeeService.addRequest(res).subscribe(
        (res) => {
          this.snackbar.open('Request sent successfully', 'close', {
            duration: 2000,
          });
          this.getRequests();
          this.promptDisplay = false;
          this.requestService.getRequestsNotifications();
        }
      );
    });    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showPrompt(){
    this.promptDisplay = true;
  }
  onPromptClose(){
    this.promptDisplay = false;
  }

  download(path: string){
    file.saveAs('http://localhost:3000/assets/certifications/'+path, `${this.certifType} certification.pdf`);
  }
}
