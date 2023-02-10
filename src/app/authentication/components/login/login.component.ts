import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReplaySubject, takeUntil } from 'rxjs';
import { IMAGE_URLS } from 'src/app/core/constants/image-source';
import { CustomValidators } from 'src/app/core/constants/validator';
import { AuthenticationRepositoryService } from '../../services/authentication-repository.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  IMAGE_URLS = IMAGE_URLS;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);


  loginForm = this.fb.group({
    login_credential: ['', [CustomValidators.required, CustomValidators.email]],
    password: ['', [CustomValidators.required, CustomValidators.password]]
  })

  constructor(
    private fb: FormBuilder,
    private authenticationRepositoryService: AuthenticationRepositoryService) { }



  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const requestObj = {
        user_name: this.loginForm.get('login_credential')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.authenticationRepositoryService.login(requestObj).pipe(
        takeUntil(this.destroyed$)
      ).subscribe({
        next: ((response) => {
          console.log(requestObj);
        }),
        error: ((error) => {
          console.log(error);
        })
      })
    }
  }

  ngOnDestroy(): void {

  }

}
