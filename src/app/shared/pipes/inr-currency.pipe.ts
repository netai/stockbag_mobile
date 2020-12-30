import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inrCurrency'
})
export class InrCurrencyPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    let returnValue = '';
    if (value>0) {
      let intValue = value.toFixed(2).split('.');
      let lastThree = intValue[0].substring(intValue[0].length - 3);
      let otherNumbers = intValue[0].substring(0, intValue[0].length - 3);
      if (otherNumbers != '' && otherNumbers != '-')
        lastThree = ',' + lastThree;
      let output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      if (intValue.length > 1) {
        output += "." + intValue[1];
      }
      returnValue = output;
    } else {
      returnValue = '0';
    }
    return returnValue;
  }

}
