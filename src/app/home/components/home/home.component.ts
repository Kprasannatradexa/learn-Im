import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, ReplaySubject, Subject } from 'rxjs';
import { HomeApiService } from '../../services/home-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchCourse = new Subject<string>();
  searchCourse$ = this.searchCourse.asObservable();

  searchLocation = new Subject<string>();
  searchLocation$ = this.searchLocation.asObservable();

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  allCourses: any;

  course: any;

  location: any;

  url: any

  constructor(private homeApiService: HomeApiService) { }

  ngOnInit(): void {

    this.homeApiService.getCourses().subscribe((response) => {
      this.allCourses = response
      console.log(response);

    })

    this.homeApiService.getInstitutes().subscribe((response) => {
      console.log(response);

    })

    this.searchCourse$.pipe(
      debounceTime(500)
    ).subscribe((searchValue: string) => {
      console.log(searchValue);
      this.getSearchedCourses(searchValue);
    })

    this.searchLocation$.pipe(
      debounceTime(500)
    ).
      subscribe((searchValue: string) => {
        console.log(searchValue);
        this.getCourseLocation(searchValue);
      })

  }


  getSearchedCourses(searchValue: string) {
    this.course = this.homeApiService.getSearchedCourse(searchValue).subscribe();
  }

  getCourseLocation(searchValue: string) {
    this.location = this.homeApiService.getCoursesLocation(searchValue).subscribe((city) => {
      console.log(city);
    })
  }

  searchCourses(value: string) {
    if (value !== '') {
      this.searchCourse.next(value);
    }
  }

  searchCity(value: string) {
    if (value !== '') {
      this.searchLocation.next(value);
    }
  }

}
