import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserSession } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuthenticated: UserSession = JSON.parse(localStorage.getItem('userData') as string);

    if (isAuthenticated) {
      return true;
    }

    return this.router.createUrlTree(['auth/login/'], {
      queryParams: {
        returnUrl: state.url
      }
    })
  }

}
