import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ImageModule } from 'primeng/image';
import { HttpLoaderFactory } from '../admin/admin.module';
import { MaterialModule } from '../material/material.module';
import { SharedService } from '../services/shared.service';
import { CertifComponent } from './certif.component';
import { AddLeaveComponent } from './leave/add-leave/add-leave.component';
import { LeaveComponent } from './leave/leave.component';
import { NoteComponent } from './leave/note/note.component';
import { ProfileComponent } from './profile/profile.component';
import { SidenavComponent } from './sidenav/sidenav.component';


@NgModule({
  declarations: [
    ProfileComponent,
    LeaveComponent,
    AddLeaveComponent,
    NoteComponent,
    CertifComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ImageModule,
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
  providers : [SharedService]
})
export class EmployeeModule { }
