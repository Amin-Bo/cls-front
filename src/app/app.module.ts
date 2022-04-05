import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// Angular Material Modules
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CertifComponent } from './employee/certif.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { MatNativeDateModule } from '@angular/material/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './employee/profile/profile.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './admin/admin.module';
import { LeaveComponent } from './employee/leave/leave.component';
import { AddLeaveComponent } from './employee/leave/add-leave/add-leave.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    CertifComponent,
    AuthComponent,
    NotFoundComponent,
    ProfileComponent,
    LeaveComponent,
    AddLeaveComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    PdfViewerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
