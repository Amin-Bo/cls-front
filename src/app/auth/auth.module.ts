import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedService } from '../services/shared.service';
import { AuthComponent } from './auth.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HttpLoaderFactory } from '../admin/admin.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    MaterialModule,
    PdfViewerModule,
    ReactiveFormsModule,
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
  providers : [SharedService]
})
export class AuthModule { }
