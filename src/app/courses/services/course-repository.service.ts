import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseDetail } from 'src/app/booking/interface/booking';
import { CourseApiService } from './course-api.service';

@Injectable({
  providedIn: 'root'
})
export class CourseRepositoryService {

  constructor(private courseApiService: CourseApiService) { }

  getCourses(): Observable<CourseDetail[]> {
    return this.courseApiService.getCourses();
  }

  searchCourses(searchValue: string): Observable<CourseDetail[]> {
    return this.courseApiService.searchCourses(searchValue);
  }

  getCourseDetail(id: string): Observable<CourseDetail> {
    return this.courseApiService.getCourseDetail(id);
  }

}
