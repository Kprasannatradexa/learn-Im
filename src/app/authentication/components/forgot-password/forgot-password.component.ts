import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReplaySubject, takeUntil } from 'rxjs';
import { CustomValidators } from 'src/app/core/constants/validator';
import { AuthenticationRepositoryService } from '../../services/authentication-repository.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(
    private fb: FormBuilder,
    private authenticationRepositoryService: AuthenticationRepositoryService
  ) { }

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);


  login_credential = this.fb.control('', [Validators.required, CustomValidators.noWhiteSpaceValidator, CustomValidators.email])


  otp = this.fb.control(null, { updateOn: 'blur', validators: CustomValidators.otp })

  resetPasswordForm = this.fb.group({
    password: ['', [CustomValidators.required, CustomValidators.password]],
    new_password: ['', [CustomValidators.required, CustomValidators.password]]
  })

  sendOtp() {
    this.login_credential.markAllAsTouched();

    if (this.login_credential.valid) {
      const userCredential = this.login_credential.value;
      this.authenticationRepositoryService.sendOtp({ username: userCredential }).pipe(
        takeUntil(this.destroyed$)
      ).subscribe({
        next: ((success) => {
          this.authenticationRepositoryService.currentLoginCredentials = userCredential;
          console.log('OTP sent');
        }),
        error: ((error) => {
          console.log(error);
        })
      })
    }

  }

  verifyOtp() {

    this.otp.markAllAsTouched();

    if (this.otp.valid) {
      this.authenticationRepositoryService.verifyOtp({ otp: this.otp.value }).pipe(
        takeUntil(this.destroyed$)
      ).subscribe({
        next: ((response) => {
          if (response?.access_token) {
            console.log('OTP verified');
          }
        }),
        error: ((error) => {
          console.log(error);
        })
      })
    }

  }





}
