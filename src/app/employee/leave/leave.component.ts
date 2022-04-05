import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Leave } from 'src/app/models/leave.model';
import { leavesEmployeeTable } from 'src/app/models/tables.model';
import { User } from 'src/app/models/user.model';
import { LeaveService } from 'src/app/services/leave.service';
import { SharedService } from 'src/app/services/shared.service';
import { AddLeaveComponent } from './add-leave/add-leave.component';


const ELEMENT_DATA: leavesEmployeeTable[] = [];

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit ,AfterViewInit{
  displayedColumns: string[] = ['n', 'sent_date', 'type','leave_days','status'];
  dataSource = new MatTableDataSource<leavesEmployeeTable>(ELEMENT_DATA);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userLocal :User = this.sharedService.getUserFromLocalStorage();
  constructor(private sharedService: SharedService , private leaveService :LeaveService ,public dialog: MatDialog) { }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(){
    this.leaveService.getLeavesByUserId(this.userLocal._id).subscribe( (leaves:Leave[]) =>{
     
      this.dataSource.data = leaves.map((res:Leave,index:number) =>{
        return {
          n: index + 1,
          sent_date: res.sent_date,
          status: res.status,
          type: res.type,
          leave_days : res.leave_days
        }
      });
    });
  }

  showPrompt(){
    this.dialog.open(AddLeaveComponent,{
      width: '700px',
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.getRequests();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
