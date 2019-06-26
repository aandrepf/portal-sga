import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, Input, OnChanges } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { formatDate } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { FeriadoService } from './../../../../services/feriado.service';

import { Feriado, EnviaEventos } from 'src/app/models/calendar.model';
import { startOfDay } from 'date-fns';

export const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-feriado-calendario',
  templateUrl: './feriado-calendario.component.html',
  styleUrls: ['./feriado-calendario.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeriadoCalendarioComponent implements OnInit, OnChanges, OnDestroy {
  @Output() enviadia: EventEmitter<any> = new EventEmitter();
  @Input() selectTab;

  private _subsFeriado: Subscription;

  // exclui finais de semana
  excludeDays: number[] = [0, 6];

  view = 'month';
  diaclicado;
  headerSelect;
  valueSelecionado = 0;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  objEvents: CalendarEvent;
  refresh: Subject<any> = new Subject();
  enviaEventos: EnviaEventos;

  listaFeriado: Feriado[];

  clickedDate: Date;

  constructor(private _feriado: FeriadoService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.selectTab !== undefined) {
      console.log('tab', this.selectTab);
    }
  }

  ngOnDestroy(): void {
    if (this._subsFeriado !== undefined) { this._subsFeriado.unsubscribe(); }
  }

  clicouDia(date: Date) {
    this.diaclicado = formatDate(date, 'dd/MM/yyyy', 'pt-BR');
    const evtFiltered = this.events.filter(x => x.start.toString() === date.toString());
    this.enviaEventos = new EnviaEventos();
    this.enviaEventos.dia = this.diaclicado;
    this.enviaEventos.evt = evtFiltered;
    this.enviaEventos.classe = this.valueSelecionado;
    this.enviadia.emit(this.enviaEventos);
  }

  recSelecionado(value) {
    this.valueSelecionado = value;
    console.log('Recebe Selecionado', this.valueSelecionado);
    if (this.events.length > 0) {
      this.events = [];
    }
    this.getFeriado(this.valueSelecionado);
    this.refresh.next();
  }

  recHeader(value) {
    this.valueSelecionado = value.value;
    this.headerSelect = value.selected;
    console.log('VALUES', this.valueSelecionado, this.headerSelect);
    if (this.events.length > 0) {
      this.events = [];
    }
    this.getFeriado(this.valueSelecionado);
    this.refresh.next();
  }

  getFeriado(value: number) {
    const mes = this.viewDate.getMonth() + 1;
    let sMes = mes.toString();
    if (sMes.length < 2) { sMes = '0' + sMes; }

    if (value === 0) {
      return false;
    } else {
      this._subsFeriado = this._feriado.baixaListaFeriado(value, sMes).subscribe(
        (data: any[]) => {
          this.listaFeriado = data;

          for (const itens of this.listaFeriado) {
            const dateObject = new Date(this.viewDate.getFullYear(), Number(itens.mes) - 1, Number(itens.dia)).toString();
            this.events.push(
              {
                start: startOfDay(new Date(dateObject)),
                title: itens.descricao,
                meta: {
                  id: itens.idFeriado,
                  idTipoFeriado: itens.idTipoferiado,
                  idClasseFeriado: itens.idClasseferiado,
                  idEstado: itens.idEstado,
                  idCodMunic: itens.idCodmunic,
                  meta: itens.meta,
                  dia: itens.dia,
                  mes: itens.mes,
                  descricao: itens.descricao
                }
              }
            );
          }
          this.refresh.next();
        },
        err => console.error('ERRO GERAR LISTA FERIADO --->', err)
      );
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {

      // tslint:disable-next-line:triple-equals
      /*if (day.events.length == 0) {
        day.cssClass = 'has-no-event';
      }*/

      const groups: any = {};
      day.events.forEach((event: CalendarEvent<{ idClasseFeriado: string }>) => {
        groups[event.meta.idClasseFeriado] = groups[event.meta.idClasseFeriado] || [];
        groups[event.meta.idClasseFeriado].push(event);

        // tslint:disable-next-line:triple-equals
        if (this.valueSelecionado == 1) {
          day.cssClass = 'has-event-feriado';
        // tslint:disable-next-line:triple-equals
        } else if (this.valueSelecionado == 2) {
          day.cssClass = 'has-event-pico';
        // tslint:disable-next-line:triple-equals
        } else if (this.valueSelecionado == 0 && day.events.length > 0) {
          day.cssClass = 'has-no-event';
        }
      });
      day['eventGroups'] = Object.entries(groups);
    });
  }

}
