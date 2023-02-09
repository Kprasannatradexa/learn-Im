import {
  HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, filter, Observable } from 'rxjs';
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
    return this.userService.user$.pipe(
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
            clientid: this.clientId,
            clientsecret: this.clientSecret
          })
        })
        return next.handle(modifiedRequest)
      })
    )
  }
}
