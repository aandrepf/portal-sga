import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sectohms'
})
export class SectohmsPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let s = value;
    const h = Math.floor(s / 3600); // get whole hours
    s -= h * 3600;
    const m = Math.floor(s / 60); // get remaining minutes
    s -= m * 60;
    return `${(h < 10 ? '0' + h : h)}:${(m < 10 ? '0' + m : m)}:${(s < 10 ? '0' + s : s)}`; // zero padding on minutes and seconds
  }
}
