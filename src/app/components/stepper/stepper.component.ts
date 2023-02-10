import { CdkStepper } from '@angular/cdk/stepper';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
})
export class StepperComponent extends CdkStepper {

  @ViewChild('formsView', { read: ElementRef }) formsView!: ElementRef;
  @Input() activeClass = 'active';
  @Input() heading!: string;
  @Input() isChild = false;


}
