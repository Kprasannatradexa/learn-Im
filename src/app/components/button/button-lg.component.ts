import { Component, Input, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';

@Component({
  selector: 'app-button-lg',
  templateUrl: './button-lg.component.html',
  styleUrls: ['./button-lg.component.scss']
})
export class ButtonLgComponent {

  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() isSecondaryBtnStyle: boolean = false;


  @Output() buttonClicked = new EventEmitter();

}
