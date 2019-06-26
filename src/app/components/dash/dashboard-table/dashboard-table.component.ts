import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ColumnSortedEvent } from '../../../sortable/sortable.service';
import { IDashboard, DashboardNavNU } from './../../../models/dashboard.model';
import { ENNivelUnidades } from '../../../models/enum';

@Component({
    selector: 'app-dashboard-table',
    templateUrl: './dashboard-table.component.html',
    styleUrls: ['./dashboard-table.component.css']
})
export class DashboardTableComponent implements OnInit {
  @Input() public nuControl: DashboardNavNU;
  @Input() public dashboard: IDashboard[] = [];
  @Output() eventFilter = new EventEmitter<IDashboard>();

  public sort: string;
  public p;
  public columnSortEvent: ColumnSortedEvent = {
    sortColumn: 'error',
    sortDirection: 'asc'
  };
  public nivelTable: number;
  public tituloTable: string;

  constructor() { this.p = 1; }
  ngOnInit() {}
  ngOnChanges(): void {
    setTimeout(() => {
      this.nivelTable = this.nuControl.NivelUnidade;
      this.tituloTable = this.nuControl.Titulo;
    }, 1000);
  }

  onSorted($event) {
    this.columnSortEvent = $event;
  }

  goTo(selectedItem: IDashboard) {
    if (this.nuControl.NivelUnidade !== ENNivelUnidades.Agencia) {
      this.eventFilter.emit(selectedItem);
    }
  }

  doSort() {
    return this.columnSortEvent.sortDirection === 'desc' ? `-${this.columnSortEvent.sortColumn}` : this.columnSortEvent.sortColumn;
  }
}
