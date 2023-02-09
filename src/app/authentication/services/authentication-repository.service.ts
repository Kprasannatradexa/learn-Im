import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserSession } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { AuthenticationApiService } from './authentication-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationRepositoryService {

  private currentLoginCredential = new BehaviorSubject<string>('');
  currentLoginCredential$ = this.currentLoginCredential.asObservable();

  constructor(private authenticationApiService: AuthenticationApiService,
    private userService: UserService) { }


  register(requestObj: any) {
    return this.authenticationApiService.register(requestObj).pipe(
      tap((response: any) => {
        if (response?.access_token) {
          this.handleAuthentication(
            response
          );
        }
      }));
  }

  login(requestObj: any) {
    return this.authenticationApiService.login(requestObj).pipe(tap((response: any) => {
      if (response?.access_token) {
        this.handleAuthentication(response);
      }
    }));
  }

  sendOtp(userName: string) {
    return this.authenticationApiService.sendOtp(userName);
  }

  verifyOtp(requestObj: any) {
    return this.authenticationApiService.verifyOtp(requestObj).pipe(tap((response: any) => {
      if (response?.access_token) {
        this.handleAuthentication(response);
      }
    }))
  }

  sendPasswordResetOtp(userName: string) {
    return this.authenticationApiService.sendPasswordResetOtp(userName);
  }

  verifyPasswordResetOtp(requestObj: any) {
    return this.authenticationApiService.verifyPasswordResetOtp(requestObj).pipe(tap((response: any) => {
      if (response?.access_token) {
        this.handleAuthentication(response)
      }
    }))
  }

  resetPassword(new_password: string) {
    const requestObj = {
      new_password
    }
    return this.authenticationApiService.resetPassword(requestObj);
  }


  logout() {
    localStorage.clear();
    this.userService.appUser = null;
  }

  resetUser() {
    localStorage.clear();
    this.userService.appUser = null;
  }

  private handleAuthentication(response: any) {
    const { access_token, refresh_token, expires_in, token_type, user } = response;
    const appUserData = new UserSession(access_token, token_type, expires_in, refresh_token, user);

    this.userService.appUser = appUserData;

    localStorage.setItem('userData', JSON.stringify(appUserData));
  }

  public set currentLoginCredentials(currentLoginCredential: string) {
    this.currentLoginCredential.next(currentLoginCredential);
  }

  public get currentLoginCredentials() {
    return this.currentLoginCredential.value;
  }
}
