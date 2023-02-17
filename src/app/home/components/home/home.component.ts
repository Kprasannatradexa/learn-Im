import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, ReplaySubject, Subject, tap } from 'rxjs';
import { CourseDetails } from 'src/app/booking/interface/booking';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { Institute } from '../../services/home-api.service';
import { HomeRepositoryService } from '../../services/home-repository.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('megaMenu') megaMenu!: ElementRef;

  searchCourse = new Subject<string>();
  searchCourse$ = this.searchCourse.asObservable();


  isLoading: boolean = false;

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  institutes$!: Observable<Institute[]>;
  courses$!: Observable<CourseDetails[]>
  searchedCourseNames$!: Observable<string[]>;

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

  constructor(private homeRepositoryService: HomeRepositoryService,
    private fb: FormBuilder,
    private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.institutes$ = this.homeRepositoryService.getInstitutes().pipe(
      catchError(() => {
        this.notificationService.showWarning('Failed load instituted')
        return of()
      }))


    this.courses$ = this.homeRepositoryService.getCourses().pipe(
      catchError(() => {
        this.notificationService.showWarning('Failed load instituted')
        return of()
      }))

    this.searchCourse$.pipe(
      debounceTime(1000)
    ).subscribe((searchValue: string) => {
      this.getSearchedCourseNames(searchValue);
    })
  }


  getSearchedCourseNames(searchValue: string) {
    this.isLoading = true;
    this.searchedCourseNames$ = this.homeRepositoryService.searchCourses(searchValue).pipe(
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

  closeMenu() {
    this.megaMenu.nativeElement.style.display = 'none';
  }

  getCourses() {
    const searchedCourse = this.searchForm.get('search_course')?.value;
    const searchedLocation = this.searchForm.get('search_location')?.value;

    if (searchedCourse || searchedLocation) {
      let searchValue = {
        ...(searchedCourse &&
          { searchedCourse }
        ),
        ...(searchedLocation &&
          { searchedLocation }
        )
      }
      searchValue = Object.values(searchValue).join(',').replace(',', ' ');
      this.homeRepositoryService.searchCourses(searchValue).subscribe((res) => {
        console.log(res);
      })
    }
  }

}
