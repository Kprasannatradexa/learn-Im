import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaBucketPipe } from './media-bucket.pipe';



@NgModule({
  declarations: [
    MediaBucketPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MediaBucketPipe
  ]
})
export class PipesModule { }
