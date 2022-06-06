import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //variables 
  form : FormGroup;
  constructor(private employeeService : EmployeeService , private matSnackbar :MatSnackBar) { }

  ngOnInit(): void {
    this.employeeService.getEmployeeById().subscribe( (data:any) =>{     
      this.form = new FormGroup({
        lastName : new FormControl(data.lastName),
        firstName : new FormControl(data.firstName),
        email : new FormControl(data.email),
        phone : new FormControl(data.phone),
        cin : new FormControl(data.cin),
        job_title : new FormControl(data.job_title),
        department : new FormControl(data.department),
      });
    } );
  }

  onSubmit(){
    this.employeeService.updateProfile(this.form.value).subscribe( (data:{updated:Boolean}) =>{
      if (data.updated){
        this.employeeService.user.next(this.form.value.firstName + ' ' + this.form.value.lastName);
        this.matSnackbar.open('Profile Updated Successfully','close',{duration:2000});
      }else{
        this.matSnackbar.open('Error Updating Profile','close',{duration:2000});
      }
    });
  }

}
