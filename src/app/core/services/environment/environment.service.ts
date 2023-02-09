import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface Environment {
  client_id: string;
  client_secret: string;
  url?: string
}

@Injectable({
  providedIn: 'root'
})

export class EnvironmentService {

  readonly baseUrl = environment.baseUrl;

  private _environment = new BehaviorSubject<Environment | null>(null);
  environment$ = this._environment.asObservable().pipe(filter(environment => !!environment));

  constructor() { }

  set environment(environment: Environment) {
    this._environment.next(environment)
  }

  get environment(): Environment {
    return this._environment.value as Environment;
  }

  clearEnvironment() {
    this._environment.next(null)
  }
}
