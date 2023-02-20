import { Pipe, PipeTransform } from '@angular/core';
import { Address } from 'src/app/core/interface/address';

@Pipe({
  name: 'completeAddressConcat'
})
export class CompleteAddressConcatPipe implements PipeTransform {

  transform(address: Address | undefined): string {
    const _address = [];

    if (address) {
      if (address.landmark) {
        _address.push(address.landmark);
      }
      if (address.city) {
        _address.push(address.city);
      }
      if (address.pincode) {
        _address.push(address.pincode);
      }
      if (address.state) {
        _address.push(address.state);
      }

      return _address.join(',')
    }
    return 'N/A';
  }

}
