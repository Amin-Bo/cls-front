import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notificationCount : Subject<number> = new Subject<number>();
  url :string = environment.api_URL + '/api/notifications/';
  constructor(private http:HttpClient) { }

  getAllNotifications(){
    return this.http.get(this.url+'getAllNotifications');
  }
  getNotificationCount(){
    this.http.get(this.url+'getAllNotifications').subscribe((res: {notifications : [] , count : number})=>{
      this.notificationCount.next(res.count);      
    });
  }
  deleteNotification(id:string){
    return this.http.delete(this.url+'deleteNotification/'+id);
  }
  notificationCountUpdateListener(){
    this.getNotificationCount();
    return this.notificationCount.asObservable();
  }
  clearNotifications(){
    return this.http.delete(this.url+'deleteAllNotifications');
  }
}
