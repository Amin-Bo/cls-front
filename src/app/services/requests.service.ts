import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Request } from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private url : string = environment.api_URL+"/api/request/"; 

  constructor(private http:HttpClient) { }

  requests = new Subject<Request[]>();
  oneReq = new Subject<Request>();

  notification = new Subject<number>();
  ///////////// ALL REQUESTS ///////////////
  getRequests(){
    this.http.get(`${this.url}getAllRequests`).subscribe(
      (data : {request : Request[]}) => {
        this.requests.next(data.request);
      }
    );
  }
  requestsUpdateListener(){
    return this.requests.asObservable();
  }
  
  ///////////// ONE REQUEST ///////////////
  getRequest(id:string){
    this.http.get(`${this.url}getRequestById/${id}`).subscribe(
      (data : {request : Request}) => {
        this.oneReq.next(data.request);
      }
    );
  }
  oneReqUpdateListener(){
    return this.oneReq.asObservable();
  }
  getRequestsNotifications(){
    this.http.get(`${this.url}getRequestsInProgress`).subscribe((data : {count : number}) => {
      this.notification.next(data.count);
    });
  }
  notificationUpdateListener(){
    return this.notification.asObservable();
  }
}
