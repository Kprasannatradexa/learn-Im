import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserSession } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new BehaviorSubject<UserSession | null>(null);
  user$ = this.user.asObservable();

  constructor() { }

  set appUser(user) {
    this.user.next(user)
  }

  get appUser() {
    return this.user.value;
  }
}
