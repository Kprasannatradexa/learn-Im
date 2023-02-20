import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaBucketPipe } from './media-bucket.pipe';
import { CompleteAddressConcatPipe } from './complete-address-concat.pipe';



@NgModule({
  declarations: [
    MediaBucketPipe,
    CompleteAddressConcatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MediaBucketPipe,
    CompleteAddressConcatPipe
  ]
})
export class PipesModule { }
