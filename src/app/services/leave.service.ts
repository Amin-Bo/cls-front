import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Leave } from '../models/leave.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  url : string = "http://localhost:3000/api/leave";

  constructor(private http : HttpClient) { }

  getAllLeaves(){
    return this.http.get(this.url+"/getAllLeaves");
  }

  getArchivedLeaves(){
    return this.http.get(this.url+"/getArchivedLeaves");
  }

  getLeavesById(id:string){
    return this.http.get(this.url+"/getLeavesById/"+id);
  }

  getLeavesByUserId(id : string){
    return this.http.get(this.url+"/getLeavesByUserId/"+id);
  }

  addLeave(leave : any) {
    const data = new FormData();
    data.append('file', leave.file);
    data.append('from', leave.from);
    data.append('leave_start_date', leave.leave_start_date);
    data.append('leave_end_date', leave.leave_end_date);
    data.append('type', leave.type);

    return this.http.post(this.url+"/addLeave",data);
  }

  updateStatus(status : string , id : string , leaves_days_count?:number,user_id?:string, note?: string) {
    return this.http.put(this.url+"/updateStatus/"+id,{status:status,leaves_days_count:leaves_days_count,user_id:user_id,note:note});

  }
}
