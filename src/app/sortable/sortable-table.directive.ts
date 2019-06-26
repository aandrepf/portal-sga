import { Directive, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';
import { SortableService } from './sortable.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[sortable-table]'
})
export class SortableTableDirective implements OnInit, OnDestroy {

  constructor(private sortService: SortableService) {}

  @Output()
  sorted = new EventEmitter();

  private columnSortedSubscription: Subscription;

  ngOnInit() {
      this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
          this.sorted.emit(event);
      });
  }

  ngOnDestroy() {
      this.columnSortedSubscription.unsubscribe();
  }

}
