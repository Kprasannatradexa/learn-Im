import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'meridiem'
})
export class MeridiemPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
