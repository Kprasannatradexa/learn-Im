import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-invoice-upload',
  templateUrl: './invoice-upload.component.html',
  styleUrls: ['./invoice-upload.component.scss']
})
export class InvoiceUploadComponent {


  uploadedFile!: File | null;

  constructor() { }


  fileUploaded(file: FileList) {
    this.uploadedFile = file[0];
  }

  getSelectedFile(event: any) {
    this.uploadedFile = event?.target?.files[0];
  }

  reset() {
    this.uploadedFile = null
  }

  uploadInvoice() {
    console.log(this.uploadedFile);

  }
}
