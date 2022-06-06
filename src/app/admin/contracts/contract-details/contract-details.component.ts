import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Contract } from 'src/app/models/contract.model';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit {
  isLoading : boolean = true;
  contract_id : string;
  path : string = "http://localhost:3000/assets/contracts/";
  pdf : string = null;
  form :FormGroup;
  indexTab :number;
  supplier_id : string;
  constructor( private route:ActivatedRoute , private contractService : ContractsService,private matSnack: MatSnackBar) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contract_id = params.id;
    });
    this.getContractById();
 
  }

  getContractById(){
    this.contractService.getContractById(this.contract_id).subscribe(
      (res: any) => {
        this.supplier_id = res.supplier;
        this.pdf = this.path + res.file;
        switch (res.payment_status) {
          case 'paid':
            this.indexTab = 0;
            break;
          case 'not_paid':
            this.indexTab = 1;
            break;
          case 'paid_by_split':
            this.indexTab = 2;
            break;
          default:
            break;
        }
        
        this.form = new FormGroup({
          date_signature : new FormControl(res.date_signature),
          expires_at : new FormControl(res.expires_at),
          payment_date : new FormControl(res.contract_details.payment_date),
          payment_amount : new FormControl(res.contract_details.payment_amount),
          due_date : new FormControl(res.contract_details.due_date),
          global_amount : new FormControl(res.contract_details.global_amount),
          number_of_slices : new FormControl(res.contract_details.number_of_slices),
          payment_each_slice : new FormControl(res.contract_details.payment_each_slice),
          method : new FormControl(res.contract_details.method),
        });
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
    data.supplier = this.supplier_id;
    this.contractService.updateContract(data,this.contract_id).subscribe(
      (res :{contract :Contract , updated : boolean}) => {
        if(res.updated){
          this.matSnack.open("Contract Updated", "close", {duration: 3000});
        }
      }
    );

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
