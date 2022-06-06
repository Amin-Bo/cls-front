import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class IsNotAuthGuard implements CanActivate {
  constructor ( private router : Router , private sharedService : SharedService){}

  canActivate(): boolean{
    // const user = JSON.parse(localStorage.getItem('user'));
    const user:any = this.sharedService.getUserFromLocalStorage();
    if (user) {
      if (user.type == "admin") {
        this.router.navigate(['/admin']);
      }else if (user.type == "employee") {
        this.router.navigate(['/employee/work']);
      }
      return false;
    } else {
      return true;
    }
  }

}
