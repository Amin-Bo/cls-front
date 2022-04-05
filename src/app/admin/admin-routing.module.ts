import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { NavAdminComponent } from './nav-admin/nav-admin.component';
import { RequestsComponent } from './requests/requests.component';
import { ValidateReqComponent } from './requests/validate-req/validate-req.component';
import { UsersComponent } from './users/users.component';
import { AddContractComponent } from './suppliers/add-contract/add-contract.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ContractDetailsComponent } from './contracts/contract-details/contract-details.component';
import { SupplierContractsComponent } from './suppliers/supplier-contracts/supplier-contracts.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoicesDetailsComponent } from './invoices/invoices-details/invoices-details.component';
import { SupplierInvoicesComponent } from './suppliers/supplier-invoices/supplier-invoices.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeavesComponent } from './leaves/leaves.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path: '', component: NavAdminComponent, children:[
    {path:'dashboard',component:DashboardComponent},
    {path:'requests',component:RequestsComponent},
    {path:'requests/:id',component:ValidateReqComponent},
    {path:'users',component:UsersComponent},
    {path:'suppliers',component:SuppliersComponent},
    {path:'suppliers/contracts/:id',component:SupplierContractsComponent},
    {path:'suppliers/invoices/:id',component:SupplierInvoicesComponent},
    {path:'suppliers/addContract', component:AddContractComponent},
    {path:'contracts',component:ContractsComponent},
    {path:'contracts/:id',component:ContractDetailsComponent},
    {path:'invoices',component:InvoicesComponent},
    {path:'invoices/:id',component:InvoicesDetailsComponent},
    {path:'leaves',component:LeavesComponent},



  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
