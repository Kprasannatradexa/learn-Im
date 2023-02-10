import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { CustomValidators } from 'src/app/core/constants/validator';
import { AuthenticationRepositoryService } from '../../services/authentication-repository.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent {

  buttonLoading: boolean = false;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  OTP_CONFIG = {
    length: 6,
    allowNumbersOnly: true,
    containerClass: 'otp-container',
    inputClass: 'otp-input'
  }

  constructor(
    private fb: FormBuilder,
    private authenticationRepositoryService: AuthenticationRepositoryService,
    private router: Router
  ) { }

  otp = this.fb.control(null, { updateOn: 'blur', validators: CustomValidators.otp })


  onOtpChange(value: string) {
    this.otp.setValue(value)
  }

  verifyOtp() {
    this.otp.markAllAsTouched;

    if (this.otp.valid) {
      this.authenticationRepositoryService.verifyOtp({ otp: this.otp.value }).pipe(
        takeUntil(this.destroyed$)
      ).subscribe({
        next: ((response) => {
          if (response?.access_token) {
            console.log('Your logged in');
            this.router.navigate(['/login'])
          }
        }),
        error: ((error) => {
          console.log(error);
        })
      })
    }

  }


  resendOTP() {
    const currentLoginCredentials = this.authenticationRepositoryService.currentLoginCredentials;

    if (!currentLoginCredentials) {
      console.log("Cannot resend OTP");
      this.router.navigate(['/auth/login-otp'])
    }

    this.authenticationRepositoryService.sendOtp({ username: currentLoginCredentials }).pipe(
      takeUntil(this.destroyed$)
    ).subscribe({
      next: ((success) => {
        console.log('OTP sent');
        this.router.navigate(['/auth/verify-otp'], { skipLocationChange: true, queryParamsHandling: 'preserve' })
      }),
      error: ((error) => {
        console.log(error);
      })
    })

  }
}
