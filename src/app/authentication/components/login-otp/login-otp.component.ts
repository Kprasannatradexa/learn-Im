import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/core/constants/validator';

@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.scss']
})
export class LoginOtpComponent {

  constructor(private fb: FormBuilder) { }

  login_credential = this.fb.control('', [Validators.required, CustomValidators.noWhiteSpaceValidator, CustomValidators.email]);


  sendOtp() {

  }

}
