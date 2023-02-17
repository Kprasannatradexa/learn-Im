import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseDetails } from 'src/app/booking/interface/booking';
import { HomeApiService } from './home-api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeRepositoryService {

  constructor(private homeApiService: HomeApiService) { }

  getCourses(): Observable<CourseDetails[]> {
    return this.homeApiService.getCourses();
  }
}
