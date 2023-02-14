import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceUploadComponent } from './components/invoice-upload/invoice-upload.component';
import { SelectTimeSlotComponent } from './components/select-time-slot/select-time-slot.component';

const routes: Routes = [
  { path: '', component: SelectTimeSlotComponent },
  { path: 'upload', component: InvoiceUploadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
