import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { CompletedCoursesComponent } from './components/completed-courses/completed-courses.component';


@NgModule({
  declarations: [
    ProfileLayoutComponent,
    MyCoursesComponent,
    CompletedCoursesComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
