import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, debounceTime, map, Observable, of, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { CourseDetails } from 'src/app/booking/interface/booking';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { CourseRepositoryService } from '../../services/course-repository.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  @ViewChild('megaMenu') megaMenu!: ElementRef;


  courses$!: Observable<CourseDetails[]>

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  searchCourse = new Subject<string>();
  searchCourse$ = this.searchCourse.asObservable();

  searchedCourseNames$!: Observable<string[]>;


  searchForm = this.fb.group({
    search_course: [''],
    search_location: ['']
  })

  isLoading: boolean = false;

  get search_course() {
    return this.searchForm.get('search_course') as FormControl
  }

  get search_location() {
    return this.searchForm.get('search_location') as FormControl
  }

  constructor(private courseRepositoryService: CourseRepositoryService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    if (this.isViewing) {
      this.courses$ = this.courseRepositoryService.getCourses().pipe(
        catchError(() => {
          this.notificationService.showWarning('Failed load institute.')
          return of()
        }))
    }

    if (this.isSearching) {
      this.route.queryParams.pipe(
        takeUntil(this.destroyed$)
      ).subscribe((queryParams) => {
        if (queryParams) {
          console.log(queryParams);

          this.courses$ = this.courseRepositoryService.searchCourses(queryParams?.['query'])
        }
      })
    }

    this.searchCourse$.pipe(
      debounceTime(1000)
    ).subscribe((searchValue: string) => {
      this.getSearchedCourseNames(searchValue);
    })


  }

  getSearchedCourseNames(searchValue: string) {
    this.isLoading = true;
    this.searchedCourseNames$ = this.courseRepositoryService.searchCourses(searchValue).pipe(
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

  searchCourses() {
    const value = this.search_course.value;
    if (value !== '') {
      this.searchCourse.next(value);
    }
  }

  patchCourseToSearch(course: string) {
    this.search_course.setValue(course);
    this.megaMenu.nativeElement.style.display = 'none';
  }


  get isSearching() {
    const isSearching = this.route.snapshot.parent?.url.length &&
      this.route.snapshot.parent.url[0].path === 'search' &&
      this.route.snapshot.queryParams?.['query'] !== '';

    return isSearching;
  }

  get isViewing() {
    const isViewing = this.route.snapshot.parent?.url.length &&
      this.route.snapshot.parent.url[0].path === 'courses'

    return isViewing;
  }

  getCourses() {
    const searchedValues = this.searchForm.getRawValue();
    const { search_course = '', search_location = '' } = searchedValues || {};

    if (search_course || search_location) {
      let queries = {
        ...(search_course &&
          { search_course }
        ),
        ...(search_location &&
          { search_location }
        )
      }
      queries = Object.values(queries).join(',').replace(',', ' ');
      this.searchForm.reset();
      this.router.navigate(['/search'], { queryParams: { query: queries }, queryParamsHandling: 'merge' })
    }
  }

}
