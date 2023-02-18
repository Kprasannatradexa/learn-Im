import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseDetails } from 'src/app/booking/interface/booking';
import { CourseApiService } from './course-api.service';

@Injectable({
  providedIn: 'root'
})
export class CourseRepositoryService {

  constructor(private courseApiService: CourseApiService) { }

  getCourses(): Observable<CourseDetails[]> {
    return this.courseApiService.getCourses();
  }

  searchCourses(searchValue: string): Observable<CourseDetails[]> {
    return this.courseApiService.searchCourses(searchValue);
  }

}
