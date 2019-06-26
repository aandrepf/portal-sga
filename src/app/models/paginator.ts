import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class MatPaginatorIntlPtBr extends MatPaginatorIntl {
    itemsPerPageLabel = 'Itens por pagina: ';

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        return ((page * pageSize) + 1) + ' - ' + ((page * pageSize) + pageSize) + ' de ' + length;
    }
}
