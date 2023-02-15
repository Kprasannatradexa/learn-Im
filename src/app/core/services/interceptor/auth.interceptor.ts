import {
  HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, filter, Observable, take } from 'rxjs';
import { Environment, EnvironmentService } from '../environment/environment.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private clientId = '';
  private clientSecret = '';

  constructor(private userService: UserService,
    private environmentService: EnvironmentService) {
    this.environmentService.environment$.pipe(
      filter(Boolean)
    ).subscribe((environment: Environment) => {
      const { client_id = '', client_secret = '' } = environment || {}
      this.clientId = client_id;
      this.clientSecret = client_secret;
    })
  }



  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.userService?.user$?.pipe(
      take(1),
      exhaustMap((user) => {
        let modifiedRequest
        if (user) {
          modifiedRequest = request.clone({
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.token)
          })
          return next.handle(modifiedRequest)
        }
        modifiedRequest = request.clone({
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            clientid: 'Q2zyGhLcTi7Z5K4lGCLoxlgE4fBAGkLHqhL9Qxk1',
            clientsecret: 'pbkdf2_sha256$390000$ePFTZbXwuIhXF3LUcct8wO$mOEqw+mfb7PYurBSBnCY+RWDDHkUHUp0l7AY/TvNU00='
          })
        })
        return next.handle(modifiedRequest)
      })
    )
  }
}
