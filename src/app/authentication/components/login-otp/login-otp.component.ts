import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IMAGE_URLS } from 'src/app/core/constants/image-source';
import { CustomValidators } from 'src/app/core/constants/validator';
import { AuthenticationRepositoryService } from '../../services/authentication-repository.service';

@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.scss']
})
export class LoginOtpComponent {



  constructor(private fb: FormBuilder,
    private authenticationRepositoryService: AuthenticationRepositoryService) { }

  login_credential = this.fb.control('', [Validators.required, CustomValidators.noWhiteSpaceValidator, CustomValidators.email]);


  sendOtp() {
    this.login_credential.markAllAsTouched;
    if (this.login_credential.valid) {
      const requestObj = {
        user_name: this.login_credential.value
      }
      this.authenticationRepositoryService.sendOtp(requestObj)
    }
  }

}
