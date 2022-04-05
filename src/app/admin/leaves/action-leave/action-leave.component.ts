import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-action-leave',
  templateUrl: './action-leave.component.html',
  styleUrls: ['./action-leave.component.css']
})
export class ActionLeaveComponent implements OnInit {
  zoom : number = 1;
  zoomed : boolean = false;
  path : string ="http://localhost:3000/assets/leaves/";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data : {id:string} ,
    public dialogRef: MatDialogRef<ActionLeaveComponent>, 
    private matSnack: MatSnackBar,
    private leaveService: LeaveService
    ) { }
  
  leave:any = {};
  lastName : string;
  firstName : string;
  id : string= this.data.id;
  zoomClass : string = "zoomIn";
  ngOnInit(): void {
    this.leaveService.getLeavesById(this.id).subscribe((res:any) => {    
      this.lastName = res.from.lastName;
      this.firstName = res.from.firstName;
      this.path = this.path + res.file;
      this.leave = res;
    });
  }

  updateStatus(status: string, id :string){
    this.leaveService.updateStatus(status, id).subscribe((res:any) => {
      this.matSnack.open("Leave Updated", 'close', {duration: 3000});
      this.dialogRef.close();
    });
  }
  changeZoom(){
    if (!this.zoomed) {
      this.zoom = this.zoom + 0.3;
      this.zoomed = true;
      this.zoomClass = "zoomOut";

    }else{
      this.zoom = this.zoom - 0.3;
      this.zoomed = false;
      this.zoomClass = "zoomIn";
  
    }
  }


}
