import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss']
})
export class MegaMenuComponent {

  @Input() isSearched: boolean = false;

  @Input() set searchedCourseNames(courseNames: string[]) {
    this._searchedCourseNames = courseNames
  }

  get searchedCourseNames() {
    return this._searchedCourseNames;
  }

  private _searchedCourseNames: string[] = [];

}
