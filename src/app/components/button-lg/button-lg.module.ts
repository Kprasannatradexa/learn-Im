import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonLgComponent } from './button-lg.component';
import { SpinnerModule } from '../spinner/spinner.module';



@NgModule({
  declarations: [
    ButtonLgComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule
  ],
  exports: [
    ButtonLgComponent
  ]
})
export class ButtonLgModule { }
