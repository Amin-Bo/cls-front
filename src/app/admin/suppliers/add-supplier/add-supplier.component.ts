import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Supplier } from 'src/app/models/supplier.model';
import { SuppliersService } from 'src/app/services/suppliers.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  constructor( private suppliersService : SuppliersService, private snackBar : MatSnackBar , private dialogRef:MatDialogRef<AddSupplierComponent>) { }
  form !: FormGroup;

  ngOnInit(): void {

    this.form = new FormGroup({
      name : new FormControl(null, [Validators.required]),
      email : new FormControl(null, [Validators.required , Validators.email] ),
      phone : new FormControl(null, [Validators.required , Validators.pattern('[0-9]{8}')]),
      address : new FormControl(null, [Validators.required]),
      contract_start_date: new FormControl(null, [Validators.required]),
      contract_end_date : new FormControl(null, [Validators.required])

    });
  }

  onSubmit(){
    this.suppliersService.addSupplier(this.form.value).subscribe((res: {success: boolean , query : Supplier} ) =>{
      if (res.success == true){
        this.snackBar.open("Supplier Added Successfully", 'close', {
          duration: 2000,
        });
        this.dialogRef.close();
      }
      else{
        this.snackBar.open("An error occured ", 'close', {
          duration: 2000,
        });
      }
    });

  }

}
