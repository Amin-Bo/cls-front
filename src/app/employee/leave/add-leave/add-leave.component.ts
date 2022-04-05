import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeaveService } from 'src/app/services/leave.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.css']
})
export class AddLeaveComponent implements OnInit {

  form : FormGroup;
  constructor(private leaveService: LeaveService , private dialogRef : MatDialogRef<AddLeaveComponent> , private snackBar: MatSnackBar, private sharedService:SharedService) { }
  LeaveType = [
    {value: 'Sick', viewValue: 'Sick'},
    {value: 'Casual', viewValue: 'Casual'},
    {value: 'Maternity', viewValue: 'Maternity'},
    {value: 'Paternity', viewValue: 'Paternity'},
    {value: 'Bereavement', viewValue: 'Bereavement'},
    {value: 'Compensatory', viewValue: 'Compensatory'},
  ];
  ngOnInit(): void {
    this.form = new FormGroup({
      leave_start_date : new FormControl(null,[Validators.required]),
      leave_end_date : new FormControl(null,[Validators.required]),
      type : new FormControl(null,[Validators.required]),
      file : new FormControl(null)
    });
  }

  onSubmit(){
    let user_id = this.sharedService.getUserFromLocalStorage()._id;
    let data = this.form.value;
    data.from = user_id;
  
      this.leaveService.addLeave(data).subscribe(
        (res:{added:boolean}) => {
          if(res){
            this.snackBar.open("Request Sent", "close", {duration: 2000});
            this.dialogRef.close();
          }
          else{
            this.snackBar.open("An error has been occured", "close", {duration: 2000});
          }
        }
      );
  }

  onFilePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({file: file});
    this.form.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
  }
}
