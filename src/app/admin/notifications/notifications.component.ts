import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ActionLeaveComponent } from '../leaves/action-leave/action-leave.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private matDialog : MatDialog,private notificationsService : NotificationsService,private matSnackBar : MatSnackBar) { }
  notifications : any;
  ngOnInit(): void {
    this.getAllNotifications();
    this.notificationsService.getNotificationCount();
  }

  getAllNotifications(){
    this.notificationsService.getAllNotifications().subscribe((res: {notifications : [] , count : number})=>{
      this.notifications = res.notifications;
    });
  }
  onClickAction(id: string){   
    this.matDialog.open(ActionLeaveComponent,{
      width : '1200px',
      data: {id : id}
    });
    this.matDialog.afterAllClosed.subscribe(() => {

    })  
  }

  DeleteNotification(id:string){
    this.notificationsService.deleteNotification(id).subscribe(()=>{
      this.getAllNotifications();
      this.notificationsService.getNotificationCount();
      this.matSnackBar.open('Notification Deleted Successfully','close',{
        duration : 2000
      });
    });
  }

  ClearNotifications(){
    this.notificationsService.clearNotifications().subscribe(()=>{
      this.getAllNotifications();
      this.notificationsService.getNotificationCount();
      this.matSnackBar.open('Notifications Cleared Successfully','close',{
        duration : 2000
      });
    });
  }

  
}
