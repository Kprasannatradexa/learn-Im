import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InvoiceUploadComponent } from './components/invoice-upload/invoice-upload.component';


@NgModule({
  declarations: [
    InvoiceUploadComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule
  ]
})
export class BookingModule { }
