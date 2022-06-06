import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Supplier } from 'src/app/models/supplier.model';
import { SuppliersService } from 'src/app/services/suppliers.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  constructor( 
    private suppliersService : SuppliersService, 
    private snackBar : MatSnackBar , 
    private dialogRef:MatDialogRef<AddSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
  form !: FormGroup;
  editMode :boolean;
  ngOnInit(): void {
    if (this.data){this.editMode = true}
    if (this.data){
      this.suppliersService.getSupplierById(this.data.id).subscribe((res: {supplier:Supplier}) => {        
        this.form = new FormGroup({
          name : new FormControl(res.supplier.name, Validators.required),
          email : new FormControl(res.supplier.email, [Validators.required, Validators.email]),
          phone : new FormControl(res.supplier.phone, Validators.required),
          address : new FormControl(res.supplier.address, Validators.required),
          contract_start_date : new FormControl(res.supplier.contract_start_date, Validators.required),
          contract_end_date : new FormControl(res.supplier.contract_end_date, Validators.required)
        });
      })
    }
    else{
      this.form = new FormGroup({
        name : new FormControl(null, [Validators.required]),
        email : new FormControl(null, [Validators.required , Validators.email] ),
        phone : new FormControl(null, [Validators.required , Validators.pattern('[0-9]{8}')]),
        address : new FormControl(null, [Validators.required]),
        contract_start_date: new FormControl(null, [Validators.required]),
        contract_end_date : new FormControl(null, [Validators.required])
      });
    }
  }

  onSubmit(){
    if (!this.editMode) {
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
    }else{
      this.suppliersService.updateSupplier(this.data.id,this.form.value).subscribe((res: {updated: boolean } ) =>{
        if (res.updated == true){
          this.snackBar.open("Supplier Updated Successfully", 'close', {
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

}
