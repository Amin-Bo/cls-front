import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private url : string = environment.api_URL+"/api/invoice/"; 

  constructor(private http:HttpClient) { }

  invoices = new Subject<Invoice[]>();

  getInvoices(){
    this.http.get(`${this.url}getAllInvoices`).subscribe(
      (res:Invoice[]) => {
        this.invoices.next(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  invoiceUpdateListener(){
    this.getInvoices();
    return this.invoices.asObservable();
  }

  getInvoiceById(id){
    return this.http.get(`${this.url}getInvoiceById/${id}`);
  }

  getInvoicesBySupplierId(id){
    return this.http.get(`${this.url}getInvoiceBySupplierId/${id}`);
  }

  addInvoice(invoice : any){
    
    const data  = new FormData();
    data.append('pdf', invoice.pdf);
    data.append('date', invoice.date);
    data.append('supplier', invoice.supplier);
    data.append('payment_status', invoice.payment_status);
    data.append('payment_method', invoice.payment_method);
    data.append('amount', invoice.amount);
    data.append('Amount_excluding_taxes', invoice.Amount_excluding_taxes);
   
    
    return this.http.post(`${this.url}addInvoice`, data);
  }
}
