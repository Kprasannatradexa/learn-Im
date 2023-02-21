import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'meridiem'
})
export class MeridiemPipe implements PipeTransform {

  transform(time: string): any {
    if (time) {
      let hr = +(time.split(':'))[0]
      let min = +(time.split(':'))[1]
      const meridiem = hr > 12 ? 'pm' : 'am';
      if (hr === 0)
        hr = 12;
      const minutes = (min + '').length == 1 ? `0${min}` : min;
      let hour: string | number = hr > 12 ? hr - 12 : hr;
      hour = (hour + '').length == 1 ? `0${hour}` : hour;
      return `${hour}:${minutes} ${meridiem}`
    }
    return
  }

}
