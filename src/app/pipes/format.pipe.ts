import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'format'
})
@Injectable()
export class FormatPipe implements PipeTransform {
    transform(input: any, args: any): any {
      switch (args) {
        case 'boolean':
          return input ? 'SIM' : 'NÃO';
        case 'status':
          switch (input) {
            case 1: return input = 'ABERTO';
            case 2: return input = 'PAUSADO';
            case 3: return input = 'EM ANDAMENTO';
            case 4: return input = 'FINALIZADO';
            case 5: return input = 'CANCELADO';
          }
        break;
        case 'equipamento':
          switch (input) {
            case 1: return input = 'TOTEM';
            case 2: return input = 'CAIXA';
            case 3: return input = 'DISPLAY';
            case 4: return input = 'OUTROS';
          }
        break;
        case 'abrangencia':
          switch (input) {
            case 1 : return input = 'NACIONAL';
            case 2 : return input = 'ESTADUAL';
            case 3 : return input = 'MUNICIPAL';
          }
      }
    }
}
