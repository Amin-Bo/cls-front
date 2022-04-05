import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  firstName : String;
  lastName : String;
  panelOpenState = false;
  constructor( private sharedService:SharedService ,  private employeeService :EmployeeService ) { }

  ngOnInit(): void {
    this.employeeService.userUpdateListener().subscribe( (data:string) =>{
      this.firstName = data;
    });
  }

  changeLanguage(lang: string) { 
    this.sharedService.changeLanguage(lang);
  }
  logout(){
    this.sharedService.logout();
  }
}
