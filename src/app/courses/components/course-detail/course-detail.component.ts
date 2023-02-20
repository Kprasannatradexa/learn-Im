import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { CourseDetail } from 'src/app/booking/interface/booking';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { CourseRepositoryService } from '../../services/course-repository.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private courseRepositoryService: CourseRepositoryService,
    private notificationService: NotificationService) { }

  id = this.route.snapshot.paramMap.get('id') as string;

  courseDetail$!: Observable<CourseDetail>;

  ngOnInit(): void {
    this.courseDetail$ = this.courseRepositoryService.getCourseDetail(this.id).pipe(
      catchError(() => {
        this.notificationService.showError('Failed to load course details.')
        return of()
      })
    )
  }

}
