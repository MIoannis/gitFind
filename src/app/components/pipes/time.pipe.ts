import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: string): string {
    const str = value.split('T')

    return `${str[0]} ${str[1].slice(0, -1)}`;
  }

}
