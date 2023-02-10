import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    StepperComponent
  ],
  imports: [
    CommonModule,
    CdkStepperModule,
    SharedModule
  ],
  exports: [
    StepperComponent, CdkStepperModule
  ]
})
export class StepperModule { }
