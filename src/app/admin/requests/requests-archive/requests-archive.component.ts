import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Request } from 'src/app/models/request.model';
import { RequestsTable } from 'src/app/models/tables.model';
import { RequestsService } from 'src/app/services/requests.service';
import { ShowDocumentComponent } from '../show-document/show-document.component';

const ELEMENT_DATA: RequestsTable[] = [];

@Component({
  selector: 'app-requests-archive',
  templateUrl: './requests-archive.component.html',
  styleUrls: ['./requests-archive.component.css']
})
export class RequestsArchiveComponent implements OnInit ,AfterViewInit {
  displayedColumns: string[] = ['n','sender', 'sent_date', 'status', 'type','file'];
  dataSource = new MatTableDataSource<RequestsTable>(ELEMENT_DATA);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private requestsService : RequestsService , private matDialog : MatDialog) { }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.requestsService.getArchivedRequests().subscribe((reqs : Request[]) =>{         
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

  onClickFile(file:string){
    this.matDialog.open(ShowDocumentComponent,{
      data : {file : file}
    });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
