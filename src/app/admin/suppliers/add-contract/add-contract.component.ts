import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contract } from 'src/app/models/contract.model';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.css']
})
export class AddContractComponent implements OnInit {

  //Variables
  form : FormGroup;
  indexTab :number;
  constructor(@Inject(MAT_DIALOG_DATA) public data : {id:string} ,public dialogRef: MatDialogRef<AddContractComponent>, private contractsService : ContractsService, private matSnack: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      date_signature : new FormControl(null),
      expires_at : new FormControl(null),
      payment_date : new FormControl(null),
      payment_amount : new FormControl(null),
      due_date : new FormControl(null),
      global_amount : new FormControl(null),
      number_of_slices : new FormControl(null),
      payment_each_slice : new FormControl(null),
      method : new FormControl(null),
      pdf : new FormControl(null),
    });
  }

  onSubmit(){
    let status : string = "paid" ;
     switch (this.indexTab) {
      case 0:
        status = 'paid';
        break;
      case 1:
        status = 'not_paid';
        break;
      case 2:
        status = 'paid_by_split';
        break;
      default:
        break;
    };

    let data = this.form.value;
    data.payment_status = status;
    data.supplier = this.data.id;
    this.contractsService.addContract(data).subscribe(
      (res :{contract :Contract , added : boolean}) => {
        if(res.added){
          this.matSnack.open("Contract Added", "close", {duration: 2000});
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

  onTabChange(){
    this.form.get('payment_date').setValue(null);
    this.form.get('payment_amount').setValue(null);
    this.form.get('due_date').setValue(null);
    this.form.get('global_amount').setValue(null);
    this.form.get('number_of_slices').setValue(null);
    this.form.get('payment_each_slice').setValue(null);
    this.form.get('method').setValue(null);
  }
}
