import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedCoursesComponent } from './components/completed-courses/completed-courses.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';

const routes: Routes = [
  {
    path: '', component: ProfileLayoutComponent, children: [
      { path: '', component: MyCoursesComponent },
      { path: 'completed-courses', component: CompletedCoursesComponent },
      { path: 'information', component: MyProfileComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
