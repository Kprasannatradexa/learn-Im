import { Component, OnInit } from '@angular/core';
import { Options } from 'angular2-notifications';
import { AuthenticationRepositoryService } from './authentication/services/authentication-repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'learn-im';

  options: Options = {
    position: ['top', 'right'],
    timeOut: 2000,
    showProgressBar: false,
    maxStack: 1,
    preventDuplicates: true
  };

  constructor(private authenticationRepositoryService: AuthenticationRepositoryService) { }

  ngOnInit(): void {
    this.authenticationRepositoryService.autoLogin();
  }
}
