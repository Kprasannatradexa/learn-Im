import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationContainerComponent } from './components/authentication-container/authentication-container.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginOtpComponent } from './components/login-otp/login-otp.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', component: AuthenticationContainerComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegistrationComponent
      },
      {
        path: 'login-otp',
        component: LoginOtpComponent
      },
      {
        path: 'verify-otp',
        component: VerifyOtpComponent,
        data: {
          redirectRoute: '/auth/login-otp'
        },
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: { redirectRoute: '/auth/login' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
