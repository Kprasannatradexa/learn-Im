import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { AvailableInstitutesComponent } from './components/available-institutes/available-institutes.component';
import { CoursesCarouselComponent } from './components/courses-carousel/courses-carousel.component';
import { CoursesComponent } from './components/courses-carousel/courses/courses.component';


@NgModule({
  declarations: [
    HomeComponent,
    AvailableInstitutesComponent,
    CoursesCarouselComponent,
    CoursesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
