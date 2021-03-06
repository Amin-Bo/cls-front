import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SuppliersService } from 'src/app/services/suppliers.service';
import ls from 'localstorage-slim';
import { LegendPosition } from '@swimlane/ngx-charts';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataByYear = [];
  dataByRange = [];
  formByYear : FormGroup;
  formByRange : FormGroup;
  formBySupplier : FormGroup;
  years =[]
  year : number;
  dataTotal =[];
  dataBySupplier = [];
  suppliers = [];
  stats : {USERS: string , CONTRACTS: string , INVOICES: string , REQUESTS: string , SUPPLIERS : string} ={
    USERS: '0',
    CONTRACTS: '0',
    INVOICES: '0',
    REQUESTS: '0',
    SUPPLIERS: '0'
  };
  requestsStats : any= {};

  gender = [];

  below : LegendPosition.Below;
  customColors = [
    {name : 'Male' , value : '#394DBA'},
    {name : 'Female' , value : '#B039BA'},
  ];

  constructor(  private dashboardService : DashboardService ,
                private snackbar: MatSnackBar , 
                private supplierService: SuppliersService,
                private http : HttpClient
              ) { }
  
  ngOnInit(): void {
    // get 15 last years from current year
    let currentYear = new Date().getFullYear();
    for(let i = 0; i < 15; i++){
      this.years.push(currentYear - i);
    }
    this.formByRange = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });


    this.formByYear = new FormGroup({
      year : new FormControl(currentYear),
    });
    
    this.InvoicesStatistiquesByYear(currentYear);
    this.dashboardService.InvoicesStatistiques().subscribe(
      (res : any) => {
          this.dataTotal = res.map((item : any) => {
            return {
              name : item.supplier[0].name,
              value : item.value
            }
          });
      });

      this.supplierService.getSuppliers();
      this.supplierService.suppliersUpdateListener().subscribe((suppliers : any) => {
        this.formBySupplier = new FormGroup({
          suppControl : new FormControl(suppliers[0]._id)
        });
        this.onSelectSupplier(suppliers[0].name);
        // console.log(suppliers[0].name);
        
        this.suppliers = suppliers.map((item : any) => {
          return {
            id : item._id,
            name : item.name
          }
        })
        
      });
      let token : string = ls.get('id_token', { decrypt: true });
      this.http.get(environment.api_URL+'/api/stats/requestsStats',{headers: {Authorization: `jwt ${token}`}}).subscribe((res : any) => {
        this.requestsStats = res;
      });

      this.http.get(environment.api_URL+'/api/stats/genderStats',{headers: {Authorization: `jwt ${token}`}}).subscribe((res : any) => {
        this.gender = [
          {name : "Male" , value : res.male},
          {name : "Female" , value : res.female}
        ];
      });

      this.http.get(environment.api_URL+'/api/stats',{headers: {Authorization: `jwt ${token}`}}).subscribe((stats:any) =>{
        this.stats = stats;        
      });
  }

  onSelectYear(){
    this.InvoicesStatistiquesByYear(this.formByYear.get("year").value);
  }

  InvoicesStatistiquesByYear(year : number){
    this.dashboardService.InvoicesStatistiquesByYear(year).subscribe(
      (res : any) => {      
        if (res.length == 0){
          this.snackbar.open("No data found for this year", "close", {duration : 4000});
        }
        if (res){
          this.dataByYear = res.map((item : any) => {
            return {
              name : item.supplier[0].name,
              value : item.value
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  rangeChanged(){
    this.dashboardService.InvoicesStatistiquesByDateRange(this.formByRange.get("start").value, this.formByRange.get("end").value).subscribe(
      (res : any) => {
        if (res){
          this.dataByRange = res.map((item : any) => {
            return {
              name : item.supplier[0].name,
              value : item.value
            }
          });
        }
      },
      err => {
        console.log(err);
      });    
  }

  onSelectSupplier(supp? : string){  
    const supplier_id = this.formBySupplier.get("suppControl").value || supp;  
    this.dashboardService.StatsBySupplier(supplier_id).subscribe(
      (res : any) => {    
        
        if (res){
          this.dataBySupplier = res.map((item : any) => {            
            return {
              name : item.supplier[0].name,
              value : item.value
            }
          });
        }
      });
  }

}
