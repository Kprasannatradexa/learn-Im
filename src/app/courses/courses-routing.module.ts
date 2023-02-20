import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CoursesComponent } from './components/courses/courses.component';

const routes: Routes = [
    { path: '', component: CoursesComponent },
    { path: ':id', component: CourseDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class CoursesRoutingModule { }