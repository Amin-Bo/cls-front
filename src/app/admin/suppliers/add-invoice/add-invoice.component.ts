import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

   //Variables
   form : FormGroup;
   constructor(@Inject(MAT_DIALOG_DATA) public data : {id:string} ,public dialogRef: MatDialogRef<AddInvoiceComponent>, private invoiceService : InvoicesService, private matSnack: MatSnackBar) { }
 
   ngOnInit(): void {
     this.form = new FormGroup({
      date : new FormControl(null,Validators.required),
      payment_status : new FormControl(null,Validators.required),
      payment_method : new FormControl(null , Validators.required),
      amount : new FormControl(null , [Validators.required, Validators.pattern("^[0-9]*$")]),
      Amount_excluding_taxes : new FormControl(null,[Validators.required, Validators.pattern("^[0-9]*$")]),
      pdf : new FormControl(null,Validators.required),
     });
   }
 
   onSubmit(){
     let data = this.form.value;
     data.supplier = this.data.id;     
     this.invoiceService.addInvoice(data).subscribe(
       (res :{contract :Invoice , added : boolean}) => {
         if(res.added){
           this.matSnack.open("Invoice Added", "close", {duration: 2000});
           //close dialog
           this.dialogRef.close();
         }
       }
     );
   }

   onImagePicked(event: Event){
      const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({pdf: file});
      this.form.get('pdf').updateValueAndValidity();
      const reader = new FileReader();
      reader.readAsDataURL(file);

   }


}
