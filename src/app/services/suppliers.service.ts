import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  private url : string = environment.api_URL+"/api/supplier/"; 

  constructor(private http: HttpClient) { }
  suppliers = new Subject<any>();

  getSuppliers(){ 
    this.http.get(`${this.url}getAllSuppliers`).subscribe((data: {suppliers : Supplier[]}) =>{
      this.suppliers.next(data.suppliers);
    });
  }
  addSupplier(supplier : Supplier){
    return this.http.post(`${this.url}addSupplier`,supplier);
  }

  getContractBySupplierId(id: string){
    return this.http.get(`${environment.api_URL}/api/contract/getContractBySupplierId/${id}`);
  }

  suppliersUpdateListener(){
    return this.suppliers.asObservable();
  }
}
