import { Component, Input, OnInit } from '@angular/core';
import { CourseDetails } from 'src/app/booking/interface/booking';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  @Input() course!: CourseDetails;
}
