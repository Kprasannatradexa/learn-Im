import { Pipe, PipeTransform } from '@angular/core';

const bucketUrl = 'https://assets.hyperinvento.com/www_learnim_com/assets/learnim-assets';

@Pipe({
  name: 'mediaBucket'
})
export class MediaBucketPipe implements PipeTransform {

  transform(value: string): string {
    return `${bucketUrl}/${value}`
  }

}
