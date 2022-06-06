import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { userTable } from 'src/app/models/tables.model';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';




const ELEMENT_DATA: userTable[] = [];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns: string[] = ['n','first_name', 'last_name', 'job_title', 'email', 'date_in','action'];
  dataSource = new MatTableDataSource<userTable>(ELEMENT_DATA);
  showAddForm : boolean = false;
  private usersSub :Subscription | undefined;
  constructor( private usersService : UsersService , private dialog : MatDialog) { }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usersService.getUsers();
    //get users
    this.usersSub = this.usersService.usersUpdateListener().subscribe((users : User[]) =>{
      //for each employee map the data and push in the dataSource
      this.dataSource.data = users.map((user:User, index:number) => {
        return {
          id : user._id,
          n : index + 1,
          first_name: user.firstName,
          last_name: user.lastName,
          job_title: user.job_title,
          email: user.email,
          date_in : user.date_in
        }
      });

    });
  }
  onEdit(id:string){
    this.dialog.open(EditUserComponent,{
      width: '700px',
      height : 'auto',
      data : {
        id : id
      }
    })
    this.dialog.afterAllClosed.subscribe(() => {
      this.getUsers();
    })
  }

  showForm(){
    // this.showAddForm = true;
    this.dialog.open(AddUserComponent,{
      width: '700px',
      height : 'auto',
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.getUsers();
    });
  }
  onClickCloseForm(){
    this.showAddForm = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnDestroy(): void {
    this.usersSub!.unsubscribe();

  }
}
