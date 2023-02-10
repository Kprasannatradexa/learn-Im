import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService {

  url: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  register(requestObj: any) {
    return this.http.post(`${this.url}/user/signup/`, requestObj)
  }

  login(requestObj: any) {
    return this.http.post(`${this.url}/buyer/auth/login/`, requestObj)
  }

  sendOtp(requestObj: any) {
    return this.http.post(`${this.url}/buyer/auth/request_login_otp`, requestObj)
  }

  verifyOtp(requestObj: any) {
    return this.http.post(`${this.url}/auth/validate_login_otp`, requestObj)
  }

  sendPasswordResetOtp(requestObj: any) {
    return this.http.post(`${this.url}/consumer/auth/request_reset_password_otp/`, requestObj);
  }

  verifyPasswordResetOtp(requestObj: any) {
    return this.http.post(`${this.url}/consumer/auth/validate_reset_password_otp/`, requestObj);
  }

  resetPassword(requestObj: any) {
    return this.http.post(`${this.url}/consumer/auth/reset_password/`, requestObj);
  }

}
