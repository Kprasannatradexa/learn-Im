import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseDetails } from 'src/app/booking/interface/booking';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseApiService {

  url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCourses(): Observable<CourseDetails[]> {
    return this.http.get<CourseDetails[]>(`${this.url}/courses/`, {
      params: new HttpParams()
        .set('expand', 'product')
        .append('expand', 'institute')
    })
  }
}
