import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptySymbol'
})
export class EmptySymbolPipe extends DecimalPipe implements PipeTransform {

  constructor() {
    super('en-US');
  }

  transform(value: any, args?: string): string {
    if (typeof value === 'number') {
      return value > 0 ? super.transform(value, args) : '-';
    } else {
      return '-';
    }
  }

}
