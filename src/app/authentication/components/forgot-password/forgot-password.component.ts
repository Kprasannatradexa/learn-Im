import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReplaySubject, takeUntil } from 'rxjs';
import { StepperComponent } from 'src/app/components/stepper/stepper.component';
import { CustomValidators } from 'src/app/core/constants/validators';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
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
    private authenticationRepositoryService: AuthenticationRepositoryService,
    private notificationService: NotificationService
  ) { }

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);


  login_credential = this.fb.control('', [Validators.required, CustomValidators.noWhiteSpaceValidator, CustomValidators.email])

  userEmail: string = '';

  otp = this.fb.control(null, { updateOn: 'blur', validators: CustomValidators.otp })

  resetPasswordForm = this.fb.group({
    password: ['', [CustomValidators.required, CustomValidators.password]],
    new_password: ['', [CustomValidators.required]]
  },
    {
      validators: [
        CustomValidators.comparePassword('password', 'new_password')
      ]
    })

  onOtpChange(value: string) {
    this.otp.setValue(value);
  }

  sendOtp() {
    this.login_credential.markAllAsTouched();

    if (this.login_credential.valid) {
      const userCredential = this.login_credential.value;
      this.authenticationRepositoryService.sendPasswordResetOtp({ user_name: userCredential }).pipe(
        takeUntil(this.destroyed$)
      ).subscribe({
        next: ((success) => {
          this.authenticationRepositoryService.currentLoginCredentials = userCredential;
          this.userEmail = userCredential;
          this.notificationService.showSuccess('OTP sent successfully.')
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
      this.authenticationRepositoryService.verifyPasswordResetOtp({ otp: this.otp.value }).pipe(
        takeUntil(this.destroyed$)
      ).subscribe({
        next: ((response) => {
          if (response?.access_token) {
            this.notificationService.showSuccess('OTP verified successfully.')
            this.cdkStepper.next();
          }
        }),
        error: ((error) => {
          console.log(error);
          this.cdkStepper.next();

        })
      })
    }
  }

  resendOTP() {

    const currentCredential = this.authenticationRepositoryService.currentLoginCredentials;

    if (!currentCredential) {
      this.notificationService.showError('Failed to resend OTP, Please try again.');
      return;
    }

    this.authenticationRepositoryService.sendPasswordResetOtp({ otp: currentCredential }).pipe(
      takeUntil(this.destroyed$)
    ).subscribe({
      next: ((success) => {
        this.notificationService.showSuccess('OTP sent successfully.')
      }),
      error: ((error) => {
        console.log(error);
      })
    })
  }

  resetPassword() {
    this.resetPasswordForm.markAllAsTouched();

    if (this.resetPasswordForm.valid) {
      this.authenticationRepositoryService.resetPassword({ new_password: this.resetPasswordForm.get('new_password') }).pipe(
        takeUntil(this.destroyed$)
      ).subscribe({
        next: ((response) => {
          if (response) {
            this.authenticationRepositoryService.resetUser();
            this.notificationService.showSuccess('Password Reset Successfully.');
          }
        }),
        error: ((error) => {
          console.log(error);
        })
      })
    }
  }





}
