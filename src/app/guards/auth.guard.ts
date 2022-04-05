import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  CanActivate, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor ( private router : Router , private snackbar : MatSnackBar , private sharedService : SharedService){}

  canActivate(): boolean{
    const token = this.sharedService.getTokenFromLocalStorage();

    if (token) {
      return true;
    } else {
      this.router.navigate(['/']);
      this.snackbar.open('You are not logged in', 'close', {
        duration: 3000
      });
      return false;
    }
  }

}
