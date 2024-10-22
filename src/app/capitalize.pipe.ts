import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {


  transform(value: string, args?: any): any {

    if (!value) return value;

    value = value.trim();
    let firstChar = value.substring(0,1);
    let allOtherChars = value.substring(1, value.length);

    let newValue = firstChar.toUpperCase() + allOtherChars.toLocaleLowerCase();

    return newValue;
  }

}
