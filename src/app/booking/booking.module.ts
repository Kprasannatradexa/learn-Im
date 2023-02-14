import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InvoiceUploadComponent } from './components/invoice-upload/invoice-upload.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    InvoiceUploadComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class BookingModule { }
