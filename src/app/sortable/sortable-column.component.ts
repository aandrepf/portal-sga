import { Component, OnInit, Input, HostListener, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';
import { SortableService } from './sortable.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[sortable-column]',
  template: `
    <ng-content></ng-content>
    <i class="fa fa-chevron-up" *ngIf="sortDirection === 'asc'" ></i>
    <i class="fa fa-chevron-down" *ngIf="sortDirection === 'desc'"></i>`
})
export class SortableColumnComponent implements OnInit, OnDestroy {

  constructor(private sortService: SortableService) { }

    // tslint:disable-next-line:no-input-rename
    @Input('sortable-column') columnName: string;

    // tslint:disable-next-line:no-input-rename
    @Input('sort-direction') sortDirection = '';

    private columnSortedSubscription: Subscription;

    @HostListener('click')
    sort() {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.sortService.columnSorted({ sortColumn: this.columnName, sortDirection: this.sortDirection });
    }

    ngOnInit() {
        // subscribe to sort changes so we can react when other columns are sorted
        this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
            // reset this column's sort direction to hide the sort icons
            if (this.columnName !== event.sortColumn) {
                this.sortDirection = '';
            }
        });
    }

    ngOnDestroy() {
        this.columnSortedSubscription.unsubscribe();
    }

}
