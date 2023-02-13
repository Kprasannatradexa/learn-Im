import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from 'src/app/core/services/environment/environment.service';
import { environment } from 'src/environments/environment';

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

  getCourses() {
    return this.http.get(`${this.url}/courses/`)
  }

  getInstitutes() {
    return this.http.get(`${this.url}/institutes/`)
  }

  getSearchedCourse(searchValue: string) {
    return this.http.get(`${this.url}/courses/`, {
      params: new HttpParams()
        .set('search', searchValue)
        .set('expand', 'product')
        .append('expand', 'institute')
    })
  }

  getSearchCourseByInstituteName(searchValue: string) {
    return this.http.get(`${this.url}/courses/`, {
      params: new HttpParams()
        .set('institute__name', searchValue)
        .set('expand', 'product')
        .append('expand', 'institute')
    })
  }



}
