import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { UserBookedCourses } from 'src/app/booking/interface/user-booked-courses';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { UserProfileRepositoryService } from '../../services/user-profile-repository.service';

export enum BookStatus {
  CONFIRMED = 'Confirmed',
  PENDING = 'Pending',
  REJECTED = 'Rejected',
  CANCELLED = 'Cancelled'
}
@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  @ViewChild('kebabMenu') kebabMenu!: ElementRef;

  BookStatus = BookStatus;

  bookedCourses$!: Observable<UserBookedCourses[]>;

  constructor(private userProfileRepositoryService: UserProfileRepositoryService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.bookedCourses$ = this.userProfileRepositoryService.getBookedCourses().pipe(
      catchError(() => {
        this.notificationService.showError('Failed to load booked courses.')
        return of()
      })
    )
  }

}
