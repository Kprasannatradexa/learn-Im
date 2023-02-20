import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, ReplaySubject, takeUntil } from 'rxjs';
import { CustomValidators } from 'src/app/core/constants/validators';
import { AuthenticationRepositoryService } from '../../services/authentication-repository.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit, OnDestroy {

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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  otp = this.fb.control(null, { updateOn: 'blur', validators: CustomValidators.otp })

  currentLoginCredentials: string = ''

  ngOnInit(): void {
    this.currentLoginCredentials = this.authenticationRepositoryService.currentLoginCredentials;
  }

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
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
            this.router.navigateByUrl(returnUrl);
          }
        }),
        error: ((error) => {
          console.log(error);
        })
      })
    }

  }


  resendOTP() {

    if (!this.currentLoginCredentials) {
      console.log("Cannot resend OTP");
      this.router.navigate(['/auth/login-otp'])
    }

    this.authenticationRepositoryService.sendOtp({ username: this.currentLoginCredentials }).pipe(
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

  ngOnDestroy(): void {
    this.authenticationRepositoryService.currentLoginCredential$ = of(null);
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
