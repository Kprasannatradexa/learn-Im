import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, of, ReplaySubject, takeUntil } from 'rxjs';
import { CourseDetails } from 'src/app/booking/interface/booking';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { CourseRepositoryService } from '../../services/course-repository.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$!: Observable<CourseDetails[]>

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);


  constructor(private courseRepositoryService: CourseRepositoryService,
    private notificationService: NotificationService,
    private route: ActivatedRoute) { }

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

}
