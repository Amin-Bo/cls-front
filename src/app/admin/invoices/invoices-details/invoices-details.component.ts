import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoices-details',
  templateUrl: './invoices-details.component.html',
  styleUrls: ['./invoices-details.component.css']
})
export class InvoicesDetailsComponent implements OnInit {

  constructor(private invoiceService : InvoicesService , private route : ActivatedRoute) { }
  invoice_id : string;
  path : string = "http://localhost:3000/assets/invoices/";
  pdf : string;
  form : FormGroup;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.invoiceService.getInvoiceById(params.id).subscribe((invoice : Invoice)=>{     
        this.invoice_id = invoice._id;   
        this.pdf = this.path + invoice.file;
        this.form = new FormGroup({
          date : new FormControl(invoice.date , [Validators.required]),
          payment_status : new FormControl(invoice.payment_status , [Validators.required]),
          payment_method : new FormControl(invoice.payment_method , [Validators.required]),
          amount : new FormControl(invoice.amount , [Validators.required , Validators.pattern("^[0-9]*$")]),
          Amount_excluding_taxes : new FormControl(invoice.amount_excluding_taxes , [Validators.required , Validators.pattern("^[0-9]*$")]),
        });
      });
    })
  }

}
