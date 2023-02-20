import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './components/courses/courses.component';
import { SharedModule } from '../shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';



@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }
