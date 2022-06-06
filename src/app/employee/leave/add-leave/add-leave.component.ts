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
  minDate: Date;
  maxDate: Date;
  leaves_left: number = this.sharedService.getUserFromLocalStorage().leaves_left;
  form : FormGroup;
  constructor(private leaveService: LeaveService ,
              private dialogRef : MatDialogRef<AddLeaveComponent> ,
              private snackBar: MatSnackBar,
              private sharedService:SharedService) { }
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

    //get today date and make it minDate
    let today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }



  onSubmit(){
    let user_id = this.sharedService.getUserFromLocalStorage()._id;
    let data = this.form.value;
    data.from = user_id;
    //calculate days between start and end date
    let start = new Date(data.leave_start_date);
    let end = new Date(data.leave_end_date);
    let diff = end.getTime() - start.getTime();
    let days = Math.ceil(diff / (1000 * 3600 * 24))+1;

    if (days > this.leaves_left) {
      this.snackBar.open('You have only '+this.leaves_left+' leaves left', 'close', {
        duration: 2000,
      });
    }else{
      this.leaveService.addLeave(data).subscribe(
        (res:{added:boolean}) => {
          if(res){
            this.sharedService.UPDATE_LEAVES_LEFT_IN_LOCAL_STORAGE(this.leaves_left-days);
            this.leaves_left = this.sharedService.getUserFromLocalStorage().leaves_left;
            this.snackBar.open("Request Sent", "close", {duration: 2000});
            this.dialogRef.close();
          }
          else{
            this.snackBar.open("An error has been occured", "close", {duration: 2000});
          }
        }
      );

    }
      
  }

  onFilePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({file: file});
    this.form.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);    
  }
}
