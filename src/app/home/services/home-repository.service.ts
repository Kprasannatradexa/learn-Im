import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseDetail } from 'src/app/booking/interface/booking';
import { HomeApiService, Institute } from './home-api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeRepositoryService {

  constructor(private homeApiService: HomeApiService) { }

  getCourses(): Observable<CourseDetail[]> {
    return this.homeApiService.getCourses();
  }

  getInstitutes(): Observable<Institute[]> {
    return this.homeApiService.getInstitutes();
  }

  searchCourses(searchValue: string): Observable<CourseDetail[]> {
    return this.homeApiService.searchCourses(searchValue);
  }

  searchCoursesByInstituteName(searchValue: string) {
    return this.homeApiService.searchCoursesByInstituteName(searchValue);
  }

}
