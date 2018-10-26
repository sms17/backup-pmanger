import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateformat',
  
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  DATE_FMT = 'dd/MMM/yyyy';
  transform(value: any, args?: any): any {
    return super.transform(value, this.DATE_FMT);
  }

}