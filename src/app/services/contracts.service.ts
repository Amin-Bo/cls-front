import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ContractsService {
  private url : string = environment.api_URL+"/api/contract/"; 

  constructor(private http:HttpClient) { }

  getAllContracts (){
    return this.http.get(`${this.url}getAllContracts`);
  }
  getExpiredContracts(){
    return this.http.get(`${this.url}getExpiredContracts`);
  }
  getContractById (id : string){
    return this.http.get( `${this.url}getContractById/` +id);
  }

  addContract(contract: any){
    const data = new FormData();
    data.append('date_signature', contract.date_signature);
    data.append('expires_at', contract.expires_at);
    data.append('payment_date', contract.payment_date);
    data.append('payment_amount', contract.payment_amount);
    data.append('due_date', contract.due_date);
    data.append('payment_status', contract.payment_status);
    data.append('global_amount', contract.global_amount);
    data.append('number_of_slices', contract.number_of_slices);
    data.append('payment_each_slice', contract.payment_each_slice);
    data.append('method', contract.method);
    data.append('pdf', contract.pdf);
    data.append('supplier', contract.supplier);
    return this.http.post(`${this.url}addContract`,data);
  }

  updateContract(contract: any , id : string){
    return this.http.put(`${this.url}updateContract/`+id,contract);
  }
}
