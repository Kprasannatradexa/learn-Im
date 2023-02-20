import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { UserBookedCourses } from 'src/app/booking/interface/user-booked-courses';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { UserProfileRepositoryService } from '../../services/user-profile-repository.service';

@Component({
  selector: 'app-completed-courses',
  templateUrl: './completed-courses.component.html',
  styleUrls: ['./completed-courses.component.scss']
})
export class CompletedCoursesComponent implements OnInit {

  completedCourses$!: Observable<UserBookedCourses[]>;

  constructor(private userProfileRepositoryService: UserProfileRepositoryService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.completedCourses$ = this.userProfileRepositoryService.getCompletedCourses().pipe(
      catchError(() => {
        this.notificationService.showError('Failed to load completed courses.')
        return of()
      })
    )
  }

}
