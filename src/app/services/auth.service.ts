import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from './shared.service';
import { Login } from '../models/user.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStatusListener = new Subject<boolean>();
  private typeListener = new Subject<string>();

  private url : string = environment.api_URL; 
  constructor(private httpClient: HttpClient, private router: Router, private snackbar: MatSnackBar, private sharedService: SharedService) { }
  login(user: { email: string, password: string }) {


    this.httpClient.post(`${this.url}/api/employee/login`, user).subscribe((res: Login) => {

      if (res.success == true) {
        this.storeUserData(res.token, res.user);
        if (res.user.type == 'admin') {

          this.router.navigate(['/admin']);
        }
        else if (res.user.type == 'employee') {
          this.router.navigate(['/employee/work']);
        }
        this.authStatusListener.next(true);
        this.typeListener.next(res.user.type);
      } else {
        this.snackbar.open(res.message, 'close', {
          duration: 2000,
        });
        this.authStatusListener.next(false);
      }
    }, err => {
      this.authStatusListener.next(false);
      this.snackbar.open("invalid credentials", 'close', { duration: 3000 });
    }
    );
  }

  storeUserData(token: string, user: any) {
    this.sharedService.putTokenInLocalStorage(token);
    this.sharedService.putUserInLocalStorage(user);
  }

}
