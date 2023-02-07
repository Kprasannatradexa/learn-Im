import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationContainerComponent } from './components/authentication-container/authentication-container.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AuthenticationContainerComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule
  ]
})
export class AuthenticationModule { }