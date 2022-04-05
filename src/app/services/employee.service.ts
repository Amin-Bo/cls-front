import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user.model';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url : string = environment.api_URL+"/api/employee/"; 

  constructor(private http:HttpClient , private sharedService : SharedService) { }

  //read id_token from local storage
  id_token : String = this.sharedService.getTokenFromLocalStorage();

  // put token in header
   headers = {
    'Authorization': 'jwt ' + this.id_token
  };

  userLocal :User = this.sharedService.getUserFromLocalStorage();

  user= new Subject<string>();

  getRequests(type : string){
    return this.http.get(`${this.url}getRequest/${type}`,{headers:this.headers});
  }

  getEmployeeById(){
    return this.http.get(`${this.url}getEmployeeById/${this.userLocal._id}`,{headers:this.headers});
      
  }

  addRequest(data :any){
    return this.http.post(`${this.url}addRequest`,data,{headers:this.headers});    
  }

  updateProfile(data :any){
    return this.http.post(`${this.url}updateEmployeeProfile/${this.userLocal._id}`,data,{headers:this.headers});    
  }


  getUserName(){
    this.getEmployeeById().subscribe( (data:User) =>{
      this.user.next(data.firstName + ' ' + data.lastName);
    });
  }

  userUpdateListener(){
    this.getUserName();
    return this.user.asObservable();
  }
}
