import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  error_msg : string;
  constructor(private usersService : UsersService, private snackBar:MatSnackBar, public dialogRef : MatDialogRef<AddUserComponent> , private translate : TranslateService) {
    this.error_msg = this.translate.instant('Please fill all the fields');
   }
  form !: FormGroup;

  ngOnInit(): void {

    this.form = new FormGroup({
      firstName : new FormControl(null, [Validators.required]),
      lastName : new FormControl(null, [Validators.required]),
      email : new FormControl(null, [Validators.required , Validators.email] ),
      password : new FormControl(null, [Validators.required , Validators.minLength(6)]),
      phone : new FormControl(null, [Validators.required]),
      cin : new FormControl(null, [Validators.required , Validators.minLength(8), Validators.maxLength(8)]),
      date_in: new FormControl(null, [Validators.required]),
      date_out: new FormControl(null),
      job_title : new FormControl(null, [Validators.required]),
      department : new FormControl(null, [Validators.required])

    });
  }

  onSubmit(){
    // check if form is empty
    if (!this.form.invalid) {
      this.usersService.addUser(this.form.value).subscribe((res: {success : boolean,message : string , user : User} ) =>{
        if (res.success == true){
          this.snackBar.open(res.message, 'close', {
            duration: 2000,
          });
          this.dialogRef.close();
        }
        else{
          this.snackBar.open(res.message, 'close', {
            duration: 2000,
          });
        }
      });
    }
    else{
      this.snackBar.open(this.error_msg, 'close', {
        duration: 4000,
      });
    }
  }

}
