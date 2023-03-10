import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationContainerComponent } from './components/authentication-container/authentication-container.component';
import { LoginComponent } from './components/login/login.component';
import { InputModule } from '../components/input/input/input.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { ButtonLgModule } from '../components/button-lg/button-lg.module';
import { LoginOtpComponent } from './components/login-otp/login-otp.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { StepperModule } from '../components/stepper/stepper.module';


@NgModule({
  declarations: [
    AuthenticationContainerComponent,
    LoginComponent,
    RegistrationComponent,
    LoginOtpComponent,
    VerifyOtpComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    InputModule,
    ButtonLgModule,
    NgOtpInputModule,
    StepperModule
  ]
})
export class AuthenticationModule { }
