import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserBookedCourses } from 'src/app/booking/interface/user-booked-courses';
import { SuccessResponse } from 'src/app/core/interface/success-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileApiService {

  url = environment.baseUrl;

  constructor(private http: HttpClient) { }


  getBookedCourses(): Observable<UserBookedCourses[]> {
    return this.http.get<UserBookedCourses[]>(`${this.url}/user/courses/`)
  }

  cancelBookedCourse(id: string): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${this.url}/user/bookings/${id}/cancel`, null)
  }

  getCompletedCourses(): Observable<UserBookedCourses[]> {
    return this.http.get<UserBookedCourses[]>(`${this.url}/user/courses/`, {
      params: new HttpParams()
        .set('course_status', 'Completed')
    })
  }

}
