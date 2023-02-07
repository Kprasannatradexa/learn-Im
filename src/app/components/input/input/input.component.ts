import { Component, Input, OnInit, Output } from '@angular/core';
import { IMAGE_URLS } from 'src/app/core/constants/image-source';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  IMAGE_URLS = IMAGE_URLS

  @Input() type: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() control: any;
  @Input() errorMessages: any;
  @Input() width!: number;
  @Input() errorType: string = '';
  @Input() required: boolean = false;
  @Input() isNewPassword: boolean = false;
  @Input() isPasswordInput: boolean = false;
  @Input() passwordInfo: boolean = false;


  // @Output() keyDown = new EventEmitter();
  // @Output() infoToggle$ = new EventEmitter();


  public maskedPassword: boolean = false;

  togglePasswordView() {
    this.type = this.type === 'text' ? 'password' : 'text';
    this.maskedPassword = !this.maskedPassword;
  }

  get errorMessage() {
    if (this.errorMessages?.[Object.keys(this?.control?.errors)?.[0]] !== undefined) {
      return this.errorMessages[Object.keys(this.control.errors)[0]];
    }
    return '';
  }



}
