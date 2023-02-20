import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseDetail } from 'src/app/booking/interface/booking';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseApiService {

  url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCourses(): Observable<CourseDetail[]> {
    return this.http.get<CourseDetail[]>(`${this.url}/courses/`, {
      params: new HttpParams()
        .set('expand', 'product')
        .append('expand', 'institute')
    })
  }

  searchCourses(searchValue: string): Observable<CourseDetail[]> {
    return this.http.get<CourseDetail[]>(`${this.url}/courses/`, {
      params: new HttpParams()
        .set('search', searchValue)
        .set('expand', 'product')
        .append('expand', 'institute')
    })
  }

  getCourseDetail(id: string): Observable<CourseDetail> {
    return this.http.get<CourseDetail>(`${this.url}/courses/${id}/`, {
      params: new HttpParams()
        .set('expand', 'product')
        .append('expand', 'institute')
    })
  }
}
