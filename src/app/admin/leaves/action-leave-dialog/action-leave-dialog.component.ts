import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-action-leave-dialog',
  templateUrl: './action-leave-dialog.component.html',
  styleUrls: ['./action-leave-dialog.component.css']
})
export class ActionLeaveDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data :any,
    public dialogRef: MatDialogRef<ActionLeaveDialogComponent>,
    private leaveService : LeaveService,
    private matSnack : MatSnackBar
  ) { }
  form : FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      note : new FormControl(null , Validators.required)
    });
  }

  onSubmit(){

    this.leaveService.updateStatus(this.data.status, this.data.id,this.data.leave_days,this.data.user_id,this.form.value.note).subscribe((res:any) => {
        this.matSnack.open("Leave Updated", 'close', {duration: 3000});
        this.dialogRef.close();     
      });    
  }
}
