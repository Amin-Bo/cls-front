import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { AdminRoutingModule } from './admin-routing.module';
import { NavAdminComponent } from './nav-admin/nav-admin.component';
import { RequestsComponent } from './requests/requests.component';
import { UsersComponent } from './users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidateReqComponent } from './requests/validate-req/validate-req.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { AddContractComponent } from './suppliers/add-contract/add-contract.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ContractDetailsComponent } from './contracts/contract-details/contract-details.component';
import { SupplierContractsComponent } from './suppliers/supplier-contracts/supplier-contracts.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoicesDetailsComponent } from './invoices/invoices-details/invoices-details.component';
import { SupplierInvoicesComponent } from './suppliers/supplier-invoices/supplier-invoices.component';
import { AddInvoiceComponent } from './suppliers/add-invoice/add-invoice.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedService } from '../services/shared.service';
import { AddUserComponent } from './users/add-user/add-user.component';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LeavesComponent } from './leaves/leaves.component';
import { ActionLeaveComponent } from './leaves/action-leave/action-leave.component';

import {ImageModule} from 'primeng/image';
import { ActionLeaveDialogComponent } from './leaves/action-leave-dialog/action-leave-dialog.component';
import { DateAdapter } from '@angular/material/core';
import { CustomDateAdapter } from './adapter/custom-date-adapter';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LeaveArchiveComponent } from './leaves/leave-archive/leave-archive.component';
import { RequestsArchiveComponent } from './requests/requests-archive/requests-archive.component';
import { ArchivedSuppliersComponent } from './suppliers/archived-suppliers/archived-suppliers.component';
import { ArchivedContractsComponent } from './contracts/archived-contracts/archived-contracts.component';
import { ShowFileComponent } from './leaves/show-file/show-file.component';
import { ShowDocumentComponent } from './requests/show-document/show-document.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http , './../../assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    NavAdminComponent,
    RequestsComponent,
    UsersComponent,
    ValidateReqComponent,
    SuppliersComponent,
    AddContractComponent,
    ContractsComponent,
    ContractDetailsComponent,
    SupplierContractsComponent,
    InvoicesComponent,
    InvoicesDetailsComponent,
    SupplierInvoicesComponent,
    AddInvoiceComponent,
    AddUserComponent,
    AddSupplierComponent,
    DashboardComponent,
    LeavesComponent,
    ActionLeaveComponent,
    ActionLeaveDialogComponent,
    EditUserComponent,
    AdminProfileComponent,
    NotificationsComponent,
    LeaveArchiveComponent,
    RequestsArchiveComponent,
    ArchivedSuppliersComponent,
    ArchivedContractsComponent,
    ShowFileComponent,
    ShowDocumentComponent,

  ],
  imports: [
    ImageModule,
    NgxChartsModule,
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    PdfViewerModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [SharedService,{ provide: DateAdapter, useClass: CustomDateAdapter },],
})
export class AdminModule { }
