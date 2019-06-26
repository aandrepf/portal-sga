import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'zeronleft'
})
export class ZeronleftPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        const d = value;
        if (d < 10) {
            return '000' + d;
        } else if (d < 100) {
            return '00' + d;
        } else if (d < 1000) {
            return '0' + d;
        } else {
            return d;
        }
    }

}
