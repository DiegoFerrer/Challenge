import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value:string ) {
    let lowerCase = value.toLowerCase()
    return `${lowerCase.charAt(0).toUpperCase()}${lowerCase.slice(1)}`;
  }

}
