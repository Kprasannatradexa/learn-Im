import { Component, Input, OnInit } from '@angular/core';
import { Institute } from '../../services/home-api.service';

@Component({
  selector: 'app-available-institutes',
  templateUrl: './available-institutes.component.html',
  styleUrls: ['./available-institutes.component.scss']
})
export class AvailableInstitutesComponent {

  @Input() set institutes(institutes: Institute[]) {
    if (institutes.length >= 5) {
      this._institutes = institutes.filter((institute, index) => {
        if (index < 4) {
          return institute;
        }
        return
      })
    } else {
      this._institutes = institutes
    }

  }

  get institutes() {
    return this._institutes;
  }

  private _institutes: Institute[] = [];

}
