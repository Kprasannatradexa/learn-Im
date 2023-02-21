import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, ReplaySubject, Subject, tap } from 'rxjs';
import { CourseDetail } from 'src/app/booking/interface/booking';
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

  @HostListener('document:click', ['$event.target']) onClick(target: any) {
    if (this.megaMenu && !this.megaMenu.nativeElement.contains(target)) {
      this.megaMenu.nativeElement.style.display = 'none';
    }
  }

  searchCourse = new Subject<string>();
  searchCourse$ = this.searchCourse.asObservable();


  isLoading: boolean = false;

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  institutes$!: Observable<Institute[]>;
  courses$!: Observable<CourseDetail[]>
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
    private notificationService: NotificationService,
    private router: Router) { }

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
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((searchValue: string) => {
      this.getSearchedCourseNames(searchValue);
    })
  }


  getSearchedCourseNames(searchValue: string) {
    this.isLoading = true;
    this.searchedCourseNames$ = this.homeRepositoryService.searchCourses(searchValue).pipe(
      map((coursesDetails: CourseDetail[]) => {
        return coursesDetails.map((courseDetail: CourseDetail) => courseDetail.title)
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

      this.router.navigate(['/search'], { queryParams: { query: queries }, queryParamsHandling: 'merge' })
    }
  }

}
