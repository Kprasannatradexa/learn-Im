import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, ReplaySubject, Subject, tap } from 'rxjs';
import { CourseDetails } from 'src/app/booking/interface/booking';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { HomeApiService, Institute } from '../../services/home-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('megaMenu') megaMenu!: ElementRef;

  searchCourse = new Subject<string>();
  searchCourse$ = this.searchCourse.asObservable();

  searchLocation = new Subject<string>();
  searchLocation$ = this.searchLocation.asObservable();

  isLoading: boolean = false;

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  institutes$!: Observable<Institute[]>;
  courses$!: Observable<CourseDetails[]>
  searchedCourses$!: Observable<string[]>;


  searchForm = this.fb.group({
    search_course: [''],
    search_location: ['']
  })

  get search_course() {
    return this.searchForm.get('search_course') as FormControl
  }

  get search_location() {
    return this.searchForm.get('search_location') as FormControl
  }

  constructor(private homeApiService: HomeApiService,
    private fb: FormBuilder,
    private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.institutes$ = this.homeApiService.getInstitutes().pipe(
      catchError(() => {
        this.notificationService.showWarning('Failed load instituted')
        return of()
      }))


    this.courses$ = this.homeApiService.getCourses().pipe(
      catchError(() => {
        this.notificationService.showWarning('Failed load instituted')
        return of()
      }))

    this.searchCourse$.pipe(
      debounceTime(1000)
    ).subscribe((searchValue: string) => {
      console.log(searchValue);
      this.getSearchedCourses(searchValue);
    })

    this.searchLocation$.pipe(
      debounceTime(1000)
    ).
      subscribe((searchValue: string) => {
        console.log(searchValue);
        this.getCourseLocation(searchValue);
      })

  }


  getSearchedCourses(searchValue: string) {
    this.isLoading = true;
    this.searchedCourses$ = this.homeApiService.getSearchedCourse(searchValue).pipe(
      map((coursesDetails: CourseDetails[]) => {
        return coursesDetails.map((courseDetail: CourseDetails) => courseDetail.title)
      }),
      catchError(() => {
        this.notificationService.showWarning('Failed load courses.');
        this.isLoading = false;
        return of();
      })
    )
  }

  getCourseLocation(searchValue: string) {
    this.homeApiService.getCoursesLocation(searchValue).subscribe((city) => {
      console.log(city);
    })
  }

  searchCourses() {
    const value = this.search_course.value;
    if (value !== '') {
      this.searchCourse.next(value);
    }
  }

  searchCity() {
    const value = this.search_location.value;
    if (value !== '') {
      this.searchLocation.next(value);
    }
  }

  patchCourseToSearch(course: string) {
    this.search_course.setValue(course);
    this.megaMenu.nativeElement.style.display = 'none';
  }

}
