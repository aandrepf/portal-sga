import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectbox'
})
export class SelectBoxPipe implements PipeTransform {
  status: number;
  transform(value: any, args?: any): any {
    switch (args) {
      case 'ABERTO':
        this.status = 1;
      break;
      case 'PENDENTE':
        this.status = 2;
      break;
      case 'EM ANDAMENTO':
        this.status = 3;
      break;
      case 'FINALIZADO':
        this.status = 4;
      break;
      case 'CANCELADO':
        this.status = 5;
      break;
    }
    if (value === undefined) {
      return false;
    } else {
      if (!args) { return value; }
      return value.filter(item => item.status === this.status);
    }
  }

}
