import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/core/constants/validator';
import { AuthenticationRepositoryService } from '../../services/authentication-repository.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent {

  buttonLoading: boolean = false;

  OTP_CONFIG = {
    length: 6,
    allowNumbersOnly: true,
    containerClass: 'otp-container',
    inputClass: 'otp-input'
  }

  constructor(
    private fb: FormBuilder,
    private authenticationRepositoryService: AuthenticationRepositoryService,
  ) { }

  otp = this.fb.control(null, { updateOn: 'blur', validators: CustomValidators.otp })


  onOtpChange(value: string) {
    this.otp.setValue(value)
  }

  verifyOtp() {

  }


  resendOTP() {

  }
}
