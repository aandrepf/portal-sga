import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'decformat'
})
export class DecformatPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return (value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
    }

}
