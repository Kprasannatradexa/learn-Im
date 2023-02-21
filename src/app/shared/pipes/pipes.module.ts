import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaBucketPipe } from './media-bucket.pipe';
import { CompleteAddressConcatPipe } from './complete-address-concat.pipe';
import { MeridiemPipe } from './meridiem.pipe';



@NgModule({
  declarations: [
    MediaBucketPipe,
    CompleteAddressConcatPipe,
    MeridiemPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MediaBucketPipe,
    CompleteAddressConcatPipe,
    MeridiemPipe
  ]
})
export class PipesModule { }
