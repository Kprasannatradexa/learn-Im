import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReplaySubject, takeUntil } from 'rxjs';
import { StepperComponent } from 'src/app/components/stepper/stepper.component';
import { CustomValidators } from 'src/app/core/constants/validator';
import { AuthenticationRepositoryService } from '../../services/authentication-repository.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  @ViewChild('cdkStepper') cdkStepper!: StepperComponent;

  OTP_CONFIG = {
    length: 6,
    allowNumbersOnly: true,
    containerClass: 'otp-container',
    inputClass: 'otp-input'
  }

  constructor(
    private fb: FormBuilder,
    private authenticationRepositoryService: AuthenticationRepositoryService
  ) { }

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);


  login_credential = this.fb.control('', [Validators.required, CustomValidators.noWhiteSpaceValidator, CustomValidators.email])

  userEmail: string = '';

  otp = this.fb.control(null, { updateOn: 'blur', validators: CustomValidators.otp })

  resetPasswordForm = this.fb.group({
    // password: ['', [CustomValidators.required, CustomValidators.password]],
    new_password: ['', [CustomValidators.required, CustomValidators.password]]
  })

  onOtpChange(value: string) {
    this.otp.setValue(value);
  }

  sendOtp() {
    this.login_credential.markAllAsTouched();

    if (this.login_credential.valid) {
      const userCredential = this.login_credential.value;
      this.authenticationRepositoryService.sendOtp({ user_name: userCredential }).pipe(
        takeUntil(this.destroyed$)
      ).subscribe({
        next: ((success) => {
          this.authenticationRepositoryService.currentLoginCredentials = userCredential;
          this.userEmail = userCredential;
          console.log('OTP sent');
          this.cdkStepper.next();
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

  resendOTP() {

    const currentCredential = this.authenticationRepositoryService.currentLoginCredentials;

    if (!currentCredential) {
      console.log('Otp cannot be sent');
    }

    this.authenticationRepositoryService.sendOtp({ otp: currentCredential }).pipe(
      takeUntil(this.destroyed$)
    ).subscribe({
      next: ((success) => {
        console.log('OTP sent');
      }),
      error: ((error) => {
        console.log(error);
      })
    })
  }

  resetPassword() {
    this.resetPasswordForm.markAllAsTouched();

    if (this.resetPasswordForm.valid) {
      console.log('This is reset password');

    }
  }





}
