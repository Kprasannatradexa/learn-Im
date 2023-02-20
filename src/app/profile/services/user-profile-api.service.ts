import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserBookedCourses } from 'src/app/booking/interface/user-booked-courses';
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

}
