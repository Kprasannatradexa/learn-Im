import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  private previousStep = new Subject();
  previousStep$ = this.previousStep.asObservable();

  private currentStep = new BehaviorSubject(0);
  currentStep$ = this.currentStep.asObservable();

  private nextStep = new Subject();
  nextStep$ = this.nextStep.asObservable();

  next() {
    this.nextStep.next(true);
  }

  previous() {
    this.previousStep.next(true);
  }

  set step(step: number) {
    this.currentStep.next(step)
  }

  get step() {
    return this.currentStep.value;
  }
}
