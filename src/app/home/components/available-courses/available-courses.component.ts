import { Component, Input, OnInit } from '@angular/core';
import { CourseDetails } from 'src/app/booking/interface/booking';

@Component({
  selector: 'app-available-courses',
  templateUrl: './available-courses.component.html',
  styleUrls: ['./available-courses.component.scss']
})
export class AvailableCoursesComponent {

  @Input() set courses(courses: CourseDetails[]) {
    this._courses = courses;
  }

  get courses() {
    return this._courses;
  }

  private _courses: CourseDetails[] = [];

}
