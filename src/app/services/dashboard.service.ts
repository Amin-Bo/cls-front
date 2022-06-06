import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  InvoicesStatistiques(){
    return this.http.get("http://proud-teal-viper.cyclic.app/api/invoice/InvoicesStatistiques");
  }

  InvoicesStatistiquesByDateRange(minDate : string , maxDate : string){
    const min = moment(minDate).format("YYYY-MM-DD");
    const max = moment(maxDate).format("YYYY-MM-DD");


    return this.http.get("http://proud-teal-viper.cyclic.app/api/invoice/InvoicesStatistiquesByDateRange/"+min+"/"+max);
  }

  InvoicesStatistiquesByYear(year : number){
    return this.http.get("http://proud-teal-viper.cyclic.app/api/invoice/InvoicesStatistiquesByYear/"+year);
  }

  StatsBySupplier(supplierId : string){
    return this.http.get("http://proud-teal-viper.cyclic.app/api/invoice/StatsBySupplier/"+supplierId);
  }
}
