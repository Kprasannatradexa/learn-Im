import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { AvailableInstitutesComponent } from './components/available-institutes/available-institutes.component';
import { AvailableCoursesComponent } from './components/available-courses/available-courses.component';


@NgModule({
  declarations: [
    HomeComponent,
    AvailableInstitutesComponent,
    AvailableCoursesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
