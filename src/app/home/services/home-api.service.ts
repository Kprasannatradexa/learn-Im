import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseDetails } from 'src/app/booking/interface/booking';
import { EnvironmentService } from 'src/app/core/services/environment/environment.service';
import { environment } from 'src/environments/environment';

export interface Institute {
  id: string;
  name: string;
  description: string;
  addresses?: InstituteAddress
}

export interface InstituteAddress {
  id: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  landmark: string;
  is_active: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class HomeApiService {

  url: string = environment.baseUrl;

  constructor(private http: HttpClient,
    private environmentService: EnvironmentService) {
    // this.environmentService.environment$.subscribe((url) => {
    //   if (url) {
    //     this.url = url;
    //   }
    // })
  }

  getCourses(): Observable<CourseDetails[]> {
    return this.http.get<CourseDetails[]>(`${this.url}/courses/`, {
      params: new HttpParams()
        .set('expand', 'product')
        .append('expand', 'institute')
    })
  }

  getInstitutes(): Observable<Institute[]> {
    return this.http.get<Institute[]>(`${this.url}/institutes/`)
  }

  getSearchedCourse(searchValue: string): Observable<CourseDetails[]> {
    return this.http.get<CourseDetails[]>(`${this.url}/courses/`, {
      params: new HttpParams()
        .set('search', searchValue)
        .set('expand', 'product')
        .append('expand', 'institute')
    })
  }

  searchCourseLocations(searchValue: string) {
    return this.http.get(`${this.url}/courses/`, {
      params: new HttpParams()
        .set('institute__addresses__icity', searchValue)  // i for case insensitivity.
    })
  }

  searchCoursesByInstituteName(searchValue: string) {
    return this.http.get(`${this.url}/courses/`, {
      params: new HttpParams()
        .set('institute__name', searchValue)
        .set('expand', 'product')
        .append('expand', 'institute')
    })
  }



}
