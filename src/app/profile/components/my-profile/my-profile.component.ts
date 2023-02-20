import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { UserDetail } from 'src/app/core/interface/user-detail';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { UserProfileRepositoryService } from '../../services/user-profile-repository.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  userDetail$!: Observable<Partial<UserDetail>>;

  constructor(private userProfileRepositoryService: UserProfileRepositoryService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.userDetail$ = this.userProfileRepositoryService.getUserDetails().pipe(
      catchError(() => {
        this.notificationService.showError('Failed to load user details.');
        return of()
      })
    )
  }

}
