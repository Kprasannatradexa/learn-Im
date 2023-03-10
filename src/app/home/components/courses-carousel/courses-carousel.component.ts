import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CourseDetail } from 'src/app/booking/interface/booking';

const customOptions: OwlOptions = {
  loop: true,
  margin: 25,
  autoplay: true,
  dots: false,
  smartSpeed: 400,
  dragEndSpeed: 350,
  responsive: {
    0: {
      items: 2
    },
    600: {
      items: 2
    },
    900: {
      items: 3
    },
    1295: {
      items: 4
    }
  },
  nav: false,
};

@Component({
  selector: 'app-courses-carousel',
  templateUrl: './courses-carousel.component.html',
  styleUrls: ['./courses-carousel.component.scss']
})
export class CoursesCarouselComponent {

  @Input() set courses(courses: CourseDetail[]) {
    this._courses = courses;
  }

  get courses() {
    return this._courses;
  }

  private _courses: CourseDetail[] = [];

  customOptions = customOptions;


}
