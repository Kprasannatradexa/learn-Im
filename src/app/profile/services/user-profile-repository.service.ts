import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserBookedCourses } from 'src/app/booking/interface/user-booked-courses';
import { SuccessResponse } from 'src/app/core/interface/success-response';
import { UserProfileApiService } from './user-profile-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileRepositoryService {

  constructor(private userProfileApiService: UserProfileApiService) { }

  getBookedCourses(): Observable<UserBookedCourses[]> {
    return this.userProfileApiService.getBookedCourses();
  }

  cancelBookedCourse(id: string): Observable<SuccessResponse> {
    return this.userProfileApiService.cancelBookedCourse(id);
  }

  getCompletedCourses(): Observable<UserBookedCourses[]> {
    return this.userProfileApiService.getCompletedCourses();
  }
}
