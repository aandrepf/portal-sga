import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FeriadoService } from 'src/app/services/feriado.service';

import { Feriado, TipoFeriado, UnidadeFederacao, MunicipioByEstado } from 'src/app/models/calendar.model';
import { ENOperation } from 'src/app/models/enum';
import { Global } from 'src/app/models/global';
import { Subscription } from 'rxjs';
import { ResultAction } from 'src/app/models/config';

export interface DialogData {
  dia: string;
  classe: number;
  operation: number;
  tituloDialog: string;
  btnCustom: string;
  object: Feriado;
}

@Component({
  selector: 'app-cadastro-dialog',
  templateUrl: './cadastro-dialog.component.html',
  styleUrls: ['./cadastro-dialog.component.css']
})
export class CadastroDialogComponent implements OnInit, OnDestroy {
  private _subDialog: Subscription;
  private _subsUf: Subscription;
  private _subsMunic: Subscription;

  feriadoGroup: FormGroup;
  resultAction: ResultAction;

  mantemFeriado: Feriado;
  tipo: TipoFeriado[];
  estado: UnidadeFederacao[];
  municipio: MunicipioByEstado[];

  dataArray: any[];
  nomeFeriado;
  selected;

  constructor(
    private _feriado: FeriadoService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CadastroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    this.dataArray = this.data.dia.split('/');

    this.feriadoGroup = this.fb.group({
      id: [this.data.operation === ENOperation.create ? 0 : ''],
      idClasseFeriado: [this.data.classe],
      idCodMunic: [''],
      idEstado: [''],
      idTipoFeriado: ['', Validators.required],
      descricao: ['', Validators.required],
      dia: [this.dataArray[0]],
      mes: [this.dataArray[1]],
      meta: ['', Validators.min(1)]
    });

    if (this.data.classe === 1) {
      this.nomeFeriado = 'FERIADO';
    } else { this.nomeFeriado = 'DIA DE PICO'; }

    if (this.data.operation !== ENOperation.create) {
      this.feriadoGroup.setValue({
        id: this.data.object.idFeriado,
        idClasseFeriado: this.data.classe,
        idCodMunic: this.data.object.idCodmunic,
        idEstado: this.data.object.idEstado,
        idTipoFeriado: this.data.object.idTipoferiado,
        descricao: this.data.object.descricao,
        dia: this.data.object.dia,
        mes: this.data.object.mes,
        meta: this.data.object.meta
      });
      this.getMunicipio(this.data.object.idEstado);
    }
    this.getTipoFeriado(this.data.object.idTipoferiado, this.data.operation);
    this.getUF(this.data.object.idEstado, this.data.operation);
    this.setControlsState(this.data.operation === ENOperation.delete ? false : true);
  }

  ngOnDestroy() {
    if (this._subDialog !== undefined) { this._subDialog.unsubscribe(); }
    if (this._subsUf !== undefined) { this._subsUf.unsubscribe(); }
    if (this._subsMunic !== undefined) { this._subsMunic.unsubscribe(); }
  }

  getTipoFeriado(tipo: number, op: number) {
    this._subDialog = this._feriado.retornaTipoFeriado().subscribe(
      (data: any[]) => {
        if (op !== ENOperation.create) {
          this.tipo = data.filter(x => x.idTipoferiado === tipo);
        } else {
          this.tipo = data;
        }
      },
    );
  }

  getUF(estado: number, op: number) {
    if (estado === null) {
      return false;
    } else {
      this._subsUf = this._feriado.retornaUF().subscribe(
        (data: any[]) => {
          if (op !== ENOperation.create) {
            this.estado = data.filter(x => x.idEstado === estado);
          } else {
            this.estado = data;
          }
        },
        err => console.error('ERROR UF ===>', err)
      );
    }
  }

  getMunicipio(estado: number) {
    if (estado === null) {
      return false;
    } else {
      this._subsMunic = this._feriado.retornaMunicipio(estado).subscribe(
        (data: any[]) => {
          if (this.data.operation !== ENOperation.create) {
            this.municipio = data.filter(x => x.idCodmunic === this.data.object.idCodmunic);
          } else {
            this.municipio = data;
          }
        },
        err => console.error('ERROR MUNIC ===>', err)
      );
    }
  }

  onSubmit() {
    this.mantemFeriado = new Feriado();
    this.mantemFeriado.idFeriado = this.feriadoGroup.value.id;
    this.mantemFeriado.idClasseferiado = Number(this.feriadoGroup.value.idClasseFeriado);

    if (this.feriadoGroup.value.idCodMunic === '') {
      this.mantemFeriado.idCodmunic = null;
    } else { this.mantemFeriado.idCodmunic = this.feriadoGroup.value.idCodMunic; }

    if (this.feriadoGroup.value.idEstado === '') {
      this.mantemFeriado.idEstado = null;
    } else { this.mantemFeriado.idEstado = this.feriadoGroup.value.idEstado; }

    this.mantemFeriado.idTipoferiado = Number(this.feriadoGroup.value.idTipoFeriado);
    this.mantemFeriado.descricao = this.feriadoGroup.value.descricao;
    this.mantemFeriado.dia = this.feriadoGroup.value.dia;
    this.mantemFeriado.mes = this.feriadoGroup.value.mes;
    this.mantemFeriado.meta = this.feriadoGroup.value.meta;

    // this.feriados.dataFeriado = '2018-02-30';
    this.mantemFeriado.dataFeriado = new Date().getFullYear().toString() + '-' +  this.dataArray[1] + '-' + this.dataArray[0];

    console.log('enviou os dados', this.mantemFeriado);

    switch (this.data.operation) {
      case ENOperation.create:
        this._subDialog = this._feriado.create(this.mantemFeriado).subscribe(
          (data: any) => {
            this.resultAction = new ResultAction();
            this.resultAction.CodAction = this.data.operation;
            this.resultAction.CodRetorno = data.RetCode;
            this.resultAction.MsgRetorno = data.RetMsg;
            this.dialogRef.close(this.resultAction);
          },
          err => console.error('ERRO', err)
        );
      break;
      case ENOperation.edit:
        this._subDialog = this._feriado.update(this.mantemFeriado.idFeriado, this.mantemFeriado).subscribe(
          (data: any) => {
            this.resultAction = new ResultAction();
            this.resultAction.CodAction = this.data.operation;
            this.resultAction.CodRetorno = data.RetCode;
            this.resultAction.MsgRetorno = data.RetMsg;
            this.dialogRef.close(this.resultAction);
          },
          err => console.error('ERRO', err)
        );
      break;
      case ENOperation.delete:
        this._subDialog = this._feriado.delete(this.mantemFeriado.idFeriado).subscribe(
          (data: any) => {
            this.resultAction = new ResultAction();
            this.resultAction.CodAction = this.data.operation;
            this.resultAction.CodRetorno = data.RetCode;
            this.resultAction.MsgRetorno = data.RetMsg;
            this.dialogRef.close(this.resultAction);
          },
          err => console.error('ERRO', err)
        );
      break;
    }
  }

  setControlsState(isEnable: boolean) {
    isEnable ? this.feriadoGroup.enable() : this.feriadoGroup.disable();
  }

}
