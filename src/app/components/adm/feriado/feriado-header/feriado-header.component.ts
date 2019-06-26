import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export class EnviaSelecionado {
  selected: string;
  value: number;
}

@Component({
  selector: 'app-feriado-header',
  templateUrl: './feriado-header.component.html',
  styleUrls: ['./feriado-header.component.css']
})
export class FeriadoHeaderComponent implements OnInit {
  @Input() view: string;
  @Input() viewDate: Date;
  @Input() locale = 'pt-BR';
  @Output() viewChange: EventEmitter<string> = new EventEmitter();
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
  @Output() selecionado = new EventEmitter();

  envia: EnviaSelecionado;

  constructor() { }

  ngOnInit() {
  }

  resetFilter() {
    this.envia = new EnviaSelecionado();
    this.envia.selected = 'selecione';
    this.envia.value = 0;
    this.selecionado.emit(this.envia);
  }

}
