import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url : string = environment.api_URL+"/api/employee/"; 

  users = new Subject<any>();
  constructor( private http : HttpClient ) { }

  addUser(user: any){
    
  return this.http.post(`${this.url}register`, user);

  }

  getUsers(){
    this.http.get(`${this.url}getEmployees`).subscribe(
      (data : any) => {
        this.users.next(data.employee);
      }
    );
  }
  usersUpdateListener(){
    return this.users.asObservable();
  }

}
