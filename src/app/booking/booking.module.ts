import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InvoiceUploadComponent } from './components/invoice-upload/invoice-upload.component';
import { CoreModule } from '../core/core.module';
import { ButtonLgModule } from '../components/button-lg/button-lg.module';
import { SelectTimeSlotComponent } from './components/select-time-slot/select-time-slot.component';


@NgModule({
  declarations: [
    InvoiceUploadComponent,
    SelectTimeSlotComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule,
    CoreModule,
    ButtonLgModule
  ]
})
export class BookingModule { }
