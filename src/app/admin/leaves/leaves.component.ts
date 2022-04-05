import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { leavesEmployeeTable } from 'src/app/models/tables.model';
import { LeaveService } from 'src/app/services/leave.service';
import { ActionLeaveComponent } from './action-leave/action-leave.component';

const ELEMENT_DATA: leavesEmployeeTable[] = [];

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit , AfterViewInit{
  displayedColumns: string[] = ['n','sender', 'sent_date','leave_start_date','leave_end_date','leave_days','status', 'type','action'];
  dataSource = new MatTableDataSource<leavesEmployeeTable>(ELEMENT_DATA);
  
  constructor(private leaveService:LeaveService , private matDialog : MatDialog ) { }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.getLeaves();
  }

  getLeaves(){
    this.leaveService.getAllLeaves().subscribe((res:any) => {      
      this.dataSource.data = res.map((res:any, index:number) => {
        return {
          id : res._id,
          n : index + 1,
          from : res.from.lastName + " " + res.from.firstName,
          sent_date : res.sent_date,
          leave_start_date : res.leave_start_date,
          leave_end_date : res.leave_end_date,
          leave_days : res.leave_days,
          type : res.type,
          status : res.status,
          file : res.file
        }
      });
    });
    
  }

  onClickAction(id: string){
    this.matDialog.open(ActionLeaveComponent,{
      width : '1200px',
      data: {id : id}
    });
    this.matDialog.afterAllClosed.subscribe(() => {
      this.getLeaves();
    })  
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
