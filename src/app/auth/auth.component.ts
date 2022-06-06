import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  form !: FormGroup;
  error_msg : string;

  constructor( private translate : TranslateService, private authService: AuthService , private snackbar : MatSnackBar , private sharedService: SharedService) { 
    this.error_msg = this.translate.instant('Please fill all the fields');
  }

  ngOnInit(): void {
    this.sharedService.initializeAppLanguage();
    this.form = new FormGroup({
      email : new FormControl(null, [Validators.required , Validators.email] ),
      password : new FormControl(null, [Validators.required , Validators.minLength(6)])
    });
  }


  onSubmit(){
    // check if form is empty

    if (!this.form.invalid) {
      this.authService.login(this.form.value);  
    }else{
      this.error_msg = this.translate.instant('Please fill all the fields');
      this.snackbar.open(this.error_msg, 'close', {
        duration: 3000,
      });
    }
  }

  changeLanguage(lang: string) { 
    this.sharedService.changeLanguage(lang);
  }
}
