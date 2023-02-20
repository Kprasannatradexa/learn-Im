import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';
import { IMAGE_URLS } from 'src/app/core/constants/image-source';
import { CustomValidators } from 'src/app/core/constants/validators';
import { AuthenticationRepositoryService } from '../../services/authentication-repository.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  IMAGE_URLS = IMAGE_URLS;

  registrationForm = this.fb.group({
    user_name: ['', [CustomValidators.required]],
    email: ['', [CustomValidators.required, CustomValidators.email]],
    mobile_number: ['', [CustomValidators.required, CustomValidators.phone]],
    password: ['', [CustomValidators.required, CustomValidators.password]],
  })

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private fb: FormBuilder,
    private authenticationRepositoryService: AuthenticationRepositoryService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid) {
      const { user_name, email, mobile_number, password } = this.registrationForm.getRawValue();

      const userName = user_name.split(' ');

      const first_name = userName[0];
      const last_name = userName[1];

      const requestObj = {
        first_name,
        ...(last_name && {
          last_name
        }),
        mobile_number,
        email,
        password
      }

      this.authenticationRepositoryService.register(requestObj).pipe(
        takeUntil(this.destroyed$)
      ).subscribe({
        next: (response) => {
          if (response?.access_token) {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
            this.router.navigateByUrl(returnUrl);
          }
        },
        error: (error) => {
          console.log(error);
        }
      })

    }
  }


  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
