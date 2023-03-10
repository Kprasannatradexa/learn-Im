import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { IMAGE_URLS } from 'src/app/core/constants/image-source';
import { CustomValidators } from 'src/app/core/constants/validators';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { AuthenticationRepositoryService } from '../../services/authentication-repository.service';

@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.scss']
})
export class LoginOtpComponent implements OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private fb: FormBuilder,
    private authenticationRepositoryService: AuthenticationRepositoryService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  login_credential = this.fb.control('', [Validators.required, CustomValidators.noWhiteSpaceValidator, CustomValidators.email]);


  sendOtp() {
    this.login_credential.markAllAsTouched;
    if (this.login_credential.valid) {

      const login_credential = this.login_credential.value;

      const requestObj = {
        user_name: login_credential
      }
      this.authenticationRepositoryService.sendOtp(requestObj).pipe(
        takeUntil(this.destroyed$)
      ).subscribe({
        next: ((success) => {
          this.notificationService.showSuccess('OTP sent successfully.')
          this.authenticationRepositoryService.currentLoginCredentials = login_credential;
          this.router.navigate(['/auth/verify-otp'], { skipLocationChange: true, queryParamsHandling: 'preserve' })
        }),
        error: ((error) => {
          console.log(error);
        })
      })
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
