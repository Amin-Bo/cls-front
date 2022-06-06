import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(private router: Router, private sharedService : SharedService , private snackBar : MatSnackBar) { }
  //get user from local storage and parse to json object
  // user = JSON.parse(localStorage.getItem('user'));
  user:any = this.sharedService.getUserFromLocalStorage();
  type = this.user.type;

  canActivate(): boolean {
    if (this.type == 'admin') {
      return true;
    }
    else {
      //check if connected
      if (this.user) {
        this.router.navigate(['/employee/work']);
        this.snackBar.open("You don't have the admin privileges ", 'close', {
          duration: 3000,
        });
        return false
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }
  }

}
