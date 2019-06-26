import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InterfaceService } from 'src/app/services/interface.service';

import { Paginas, MantemPagina } from 'src/app/models/interface.model';
import { ENOperation } from 'src/app/models/enum';
import { GlobalInterface } from './../../../../../shared/global-interface';
import { Subscription } from 'rxjs';
import { ResultAction } from 'src/app/models/config';

export interface DialogData {
  operation: number;
  tituloDialog: string;
  btnCustom: string;
  object: Paginas;
}

@Component({
  selector: 'app-interface-dialog',
  templateUrl: './interface-dialog.component.html',
  styleUrls: ['./interface-dialog.component.css']
})
export class InterfaceDialogComponent implements OnInit, OnDestroy {
  private _subDialog: Subscription;

  paginaGroup: FormGroup;
  resultAction: ResultAction;
  mantemPagina: MantemPagina;

  constructor(
    private _interface: InterfaceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InterfaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.paginaGroup = this.fb.group({
      id: [this.data.operation === ENOperation.create ? 0 : ''],
      descricao: ['', Validators.required],
      prioritario: [this.data.operation === ENOperation.create ? false : '', Validators.required],
      voltar: [this.data.operation === ENOperation.create ? false : '', Validators.required],
    });

    if (this.data.operation !== ENOperation.create) {
      this.paginaGroup.setValue({
        id: this.data.object.id,
        descricao: this.data.object.descr,
        prioritario: this.data.object.iconePrioritario,
        voltar: this.data.object.btnVoltar
      });
    }

    this.setControlsState(this.data.operation === ENOperation.delete ? false : true);
  }

  ngOnDestroy() {
    if (this._subDialog !== undefined) { this._subDialog.unsubscribe(); }
  }

  onSubmit() {
    this.mantemPagina = new MantemPagina();
    this.mantemPagina.idEmissorPagina = this.paginaGroup.value.id;
    this.mantemPagina.descr = this.paginaGroup.value.descricao;
    this.mantemPagina.iconePrioritario = this.paginaGroup.value.prioritario;
    this.mantemPagina.btnVoltar = this.paginaGroup.value.voltar;
    this.mantemPagina.action = this.data.operation;
    this.mantemPagina.msgExtra = '';

    const url = this._interface.appConfig.urlAzureServer + GlobalInterface.ATUALIZA_PAGINAS;

    console.log('enviou os dados', this.mantemPagina);

    switch (this.data.operation) {
      case ENOperation.create:
        this._subDialog = this._interface.create(url, this.mantemPagina).subscribe(
          (data: any) => {
            console.log(data);
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
        this._subDialog = this._interface.create(url, this.mantemPagina).subscribe(
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
        this._subDialog = this._interface.create(url, this.mantemPagina).subscribe(
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
    isEnable ? this.paginaGroup.enable() : this.paginaGroup.disable();
  }
}
