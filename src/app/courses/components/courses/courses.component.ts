import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
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


  constructor(private courseRepositoryService: CourseRepositoryService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.courses$ = this.courseRepositoryService.getCourses().pipe(
      catchError(() => {
        this.notificationService.showWarning('Failed load instituted')
        return of()
      }))
  }

}
