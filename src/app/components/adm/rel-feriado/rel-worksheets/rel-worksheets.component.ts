import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import * as XLSX from 'xlsx';
import { Subscription } from 'rxjs';

import { FeriadoService } from 'src/app/services/feriado.service';

import { Feriado, VerifyFeriado } from 'src/app/models/calendar.model';
import { MatSnackBar } from '@angular/material';

type AOA = any[][];

@Component({
  selector: 'app-rel-worksheets',
  templateUrl: './rel-worksheets.component.html',
  styleUrls: ['./rel-worksheets.component.css']
})
export class RelWorksheetsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() recebeWS;
  @Input() recebeSheets;
  @Output() change = new EventEmitter();

  private _subFeriado: Subscription;
  private _subFeriadoPost: Subscription;
  private _subFeriadoPut: Subscription;

  feriadoSheet: Feriado;
  consulta: VerifyFeriado;

  data: AOA = [];
  year = new Date();
  element: any[];
  newElement: any[];
  showButton = false;

  constructor(private _feriado: FeriadoService, public snackBar: MatSnackBar) { }

  ngOnInit() {}

  ngOnChanges() {
    const ws: XLSX.WorkSheet = this.recebeSheets[this.recebeWS];

    /* save data */
    this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1, defval: null}));

    const e = this.data.map(item => {
      return item.filter(it => it !== '#N/A' && it !== null && it !== ' ');
    });

    this.element = e.filter(v => v.length > 1);
    if (this.element.length > 1) {
      this.showButton = true;
    }

    this.newElement = this.element.map(x => {
      const tamanho = x.length;
      if (tamanho > 9) {
        return x.slice(0, 9);
      }
      if (tamanho < 3) {
        return x.slice(3);
      }
      return x;
    });
  }

  ngOnDestroy() {
    if (this._subFeriado !== undefined) { this._subFeriado.unsubscribe(); }
    if (this._subFeriadoPost !== undefined) { this._subFeriadoPost.unsubscribe(); }
    if (this._subFeriadoPut !== undefined) { this._subFeriadoPut.unsubscribe(); }
  }

  createConsulta() {
    let nElement;
    if (this.newElement.length > 5) {
      nElement = this.newElement.slice(2);
    } else {
      nElement = this.newElement.slice(1);
    }
    for (const item of nElement) {
      this.consulta = new VerifyFeriado();
      switch (this.recebeWS) {
        case 'Feriado Nacional': this.consulta.idTipoFeriado = 1;
        break;
        case 'Feriado Estadual': this.consulta.idTipoFeriado = 2;
        break;
        case 'Feriado Municipal': this.consulta.idTipoFeriado = 3;
        break;
      }
      item[0] === 'FERIADO' ? this.consulta.idClasseFeriado = 1 : this.consulta.idClasseFeriado = 2;
      this.consulta.dia = item[1];
      this.consulta.mes = item[2];
      this.consulta.meta = item[3];
      this.consulta.descricao = item[4];

      switch (this.consulta.idTipoFeriado) {
        case 1:
          this.consulta.idEstado = 0;
          this.consulta.nomeEstado = '';
          this.consulta.idCodMunic = 0;
          this.consulta.nomeMunic = '';
        break;
        case 2:
          this.consulta.idEstado = item[5];
          this.consulta.nomeEstado = item[6];
          this.consulta.idCodMunic = 0;
          this.consulta.nomeMunic = '';
        break;
        case 3:
          this.consulta.idEstado = item[5];
          this.consulta.nomeEstado = item[6];
          this.consulta.idCodMunic = item[7];
          this.consulta.nomeMunic = item[8];
        break;
      }

      console.log('monta verify feriado', this.consulta);
      this.insereFeriado(this.consulta);
      this.atualizaFeriado(this.consulta);
    }
  }

  insereFeriado(object) {
    this._subFeriado = this._feriado.verificaFeriado(object).subscribe(
      (data: any) => {
      this.feriadoSheet = data;
      console.log('Feriado verificado', this.feriadoSheet.idFeriado);
      if (this.feriadoSheet.idFeriado === 0 && object !== undefined) {
        this.feriadoSheet.idFeriado = 0;
        this.feriadoSheet.idTipoferiado = object.idTipoFeriado;
        this.feriadoSheet.idClasseferiado = object.idClasseFeriado;

        if (object.idEstado === 0) {
          this.feriadoSheet.idEstado = null;
        } else { this.feriadoSheet.idEstado = object.idEstado; }
        if (object.idCodMunic === 0) {
          this.feriadoSheet.idCodmunic = null;
        } else { this.feriadoSheet.idCodmunic = object.idCodMunic; }

        this.feriadoSheet.meta = object.meta;

        if (object.dia < 10) {
          this.feriadoSheet.dia = '0' + object.dia.toString();
        } else { this.feriadoSheet.dia = object.dia.toString(); }
        if (object.mes < 10) {
          this.feriadoSheet.mes = '0' + object.mes.toString();
        } else { this.feriadoSheet.mes = object.mes.toString(); }

        this.feriadoSheet.dataFeriado = this.year.getFullYear().toString() + '/' +  this.feriadoSheet.mes + '/' + this.feriadoSheet.dia;
        this.feriadoSheet.descricao = object.descricao;

        console.log('OBJETO INSERE', this.feriadoSheet);

        this._subFeriadoPost = this._feriado.create(this.feriadoSheet)
        .subscribe(() => {
          console.warn('OBJETO FOI INSERIDO NA BASE');
          this.snackBar.open('OBJETO FOI INSERIDO NA BASE', 'INSERIDO', {
            duration: 3000,
          });
        });
      } else { return false; }
    });
  }

  atualizaFeriado(object) {
    this._subFeriado = this._feriado.verificaFeriado(object).subscribe(
      (data: any) => {
      this.feriadoSheet = data;
      console.log('Feriado verificado', this.feriadoSheet.idFeriado);
      if (this.feriadoSheet.idFeriado > 0 && object !== undefined) {
        this.feriadoSheet.idTipoferiado = object.idTipoFeriado;
        this.feriadoSheet.idClasseferiado = object.idClasseFeriado;

        if (object.idEstado === 0) {
          this.feriadoSheet.idEstado = null;
        } else { this.feriadoSheet.idEstado = object.idEstado; }
        if (object.idCodMunic === 0) {
          this.feriadoSheet.idCodmunic = null;
        } else { this.feriadoSheet.idCodmunic = object.idCodMunic; }

        this.feriadoSheet.meta = object.meta;

        if (object.dia < 10) {
          this.feriadoSheet.dia = '0' + object.dia.toString();
        } else { this.feriadoSheet.dia = object.dia.toString(); }
        if (object.mes < 10) {
          this.feriadoSheet.mes = '0' + object.mes.toString();
        } else { this.feriadoSheet.mes = object.mes.toString(); }

        this.feriadoSheet.dataFeriado = this.year.getFullYear().toString() + '/' +  this.feriadoSheet.mes + '/' + this.feriadoSheet.dia;
        this.feriadoSheet.descricao = object.descricao;

        console.log('OBJETO ATUALIZA', this.feriadoSheet);

        this._subFeriadoPut = this._feriado.update(this.feriadoSheet.idFeriado, this.feriadoSheet)
        .subscribe(() => {
          console.warn();
          this.snackBar.open('OBJETO FOI ATUALIZADO NA BASE', 'ATUALIZADO', {
            duration: 3000,
          });
        });
      } else { return false; }
    });
  }
}
