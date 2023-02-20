import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { CompletedCoursesComponent } from './components/completed-courses/completed-courses.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProfileLayoutComponent,
    MyCoursesComponent,
    CompletedCoursesComponent,
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
