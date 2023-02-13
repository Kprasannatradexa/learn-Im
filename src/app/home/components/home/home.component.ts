import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, ReplaySubject, Subject } from 'rxjs';
import { HomeApiService } from '../../services/home-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchQuery = new Subject<string>();
  searchQuery$ = this.searchQuery.asObservable();

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  course: any;

  constructor(private homeApiService: HomeApiService) { }

  ngOnInit(): void {

    this.searchQuery$.subscribe((searchValue: string) => {
      console.log(searchValue);
      this.getSearchedCourses(searchValue);
    })

  }


  getSearchedCourses(searchValue: string) {
    this.course = this.homeApiService.getSearchedCourse(searchValue).subscribe();
  }

  searchCourses(value: string) {
    if (value !== '') {
      this.searchQuery.next(value);
    }
  }

}
