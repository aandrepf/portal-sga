import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { ClasseFeriado } from './../../../../models/calendar.model';
import { FeriadoService } from './../../../../services/feriado.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feriado-filter',
  templateUrl: './feriado-filter.component.html',
  styleUrls: ['./feriado-filter.component.css']
})
export class FeriadoFilterComponent implements OnInit, OnChanges, OnDestroy {
  @Output() selecionado = new EventEmitter();
  @Input() tab;
  @Input() selectHeader;

  private _subsFilter: Subscription;

  selected = 'selecione';
  classe: ClasseFeriado[];

  constructor(private _feriado: FeriadoService) { }

  ngOnInit() {
    this._subsFilter = this._feriado.retornaClasseFeriado().subscribe(
      (data: any[]) => {
        this.classe = data;
      }
    );
  }

  ngOnChanges() {
    if (this.tab === 0) {
      this.resetFilter();
    }
    if (this.selectHeader === 'selecione') {
      this.resetFilter();
    }
  }

  ngOnDestroy() {
    if (this._subsFilter !== undefined) { this._subsFilter.unsubscribe(); }
  }

  selectedFilter(selected: number) {
    this.selecionado.emit(selected);
  }

  limpaFilter() {
    this.selected = this.selectHeader;
    this.selecionado.emit(0);
  }

  resetFilter() {
    this.selected = 'selecione';
    this.selecionado.emit(0);
  }

}
