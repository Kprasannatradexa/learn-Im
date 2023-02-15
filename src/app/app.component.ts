import { Component, OnInit } from '@angular/core';
import { AuthenticationRepositoryService } from './authentication/services/authentication-repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'learn-im';

  constructor(private authenticationRepositoryService: AuthenticationRepositoryService) { }

  ngOnInit(): void {
    this.authenticationRepositoryService.autoLogin();
  }
}
