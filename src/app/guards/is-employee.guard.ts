import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class IsEmployeeGuard implements CanActivate {
  constructor (private router: Router , private sharedService:SharedService){}
  //get user from local storage and parse to json object
  user:any = this.sharedService.getUserFromLocalStorage();

  type = this.user.type;

  canActivate(): boolean{
    if (this.type == 'employee') {
      return true;
    }
    else {
      //check if connected
      if (this.user) {
        this.router.navigate(['/admin']);
        return false
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }
  }


}
