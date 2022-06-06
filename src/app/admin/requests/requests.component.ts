import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Request } from 'src/app/models/request.model';
import { RequestsTable } from 'src/app/models/tables.model';
import { RequestsService } from 'src/app/services/requests.service';



const ELEMENT_DATA: RequestsTable[] = [];

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['n','sender', 'sent_date', 'status', 'type','action'];
  dataSource = new MatTableDataSource<RequestsTable>(ELEMENT_DATA);
  private requestsSub :Subscription | undefined;

  constructor( private requestsService : RequestsService) { }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }
  ngOnInit(): void {
    this.getReqs();
  }


  getReqs(){
    this.requestsService.getRequestsNotifications();
    this.requestsService.getRequests();

    this.requestsSub = this.requestsService.requestsUpdateListener().subscribe((reqs : Request[]) =>{
      //for each employee map the data and push in the dataSource
      this.dataSource.data = reqs.map((reqs:Request, index:number) => {
        return {
          id : reqs._id,
          n : index + 1,
          from : reqs.from.lastName + " " + reqs.from.firstName,
          sent_date : reqs.sent_date,
          status : reqs.status,
          type : reqs.type,
          file : reqs.file
        }
      });


    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
