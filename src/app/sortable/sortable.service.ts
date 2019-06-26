import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';

export interface ColumnSortedEvent {
    sortColumn: string;
    sortDirection: string;
}

@Injectable()
export class SortableService {

    constructor() {}

    private columnSortedSource = new Subject<ColumnSortedEvent>();

    public columnSorted$ = this.columnSortedSource.asObservable();

    columnSorted(event: ColumnSortedEvent) {
        this.columnSortedSource.next(event);
    }

}

