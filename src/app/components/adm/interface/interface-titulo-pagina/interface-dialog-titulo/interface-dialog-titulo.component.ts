import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InterfaceService } from 'src/app/services/interface.service';

import { Titulo, MantemTituloPagina } from 'src/app/models/interface.model';
import { ENOperation } from 'src/app/models/enum';
import { GlobalInterface } from './../../../../../shared/global-interface';
import { Subscription } from 'rxjs';
import { ResultAction } from 'src/app/models/config';

export interface DialogData {
  page: number;
  operation: number;
  tituloDialog: string;
  btnCustom: string;
  object: Titulo;
}

@Component({
  selector: 'app-interface-dialog-titulo',
  templateUrl: './interface-dialog-titulo.component.html',
  styleUrls: ['./interface-dialog-titulo.component.css']
})
export class InterfaceDialogTituloComponent implements OnInit, OnDestroy {
  private _subDialog: Subscription;

  tituloGroup: FormGroup;
  resultAction: ResultAction;
  mantemTitulo: MantemTituloPagina;

  constructor(
    private _interface: InterfaceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InterfaceDialogTituloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    this.tituloGroup = this.fb.group({
      id: [this.data.operation === ENOperation.create ? 0 : ''],
      texto: ['', Validators.required],
      fonte: ['', Validators.min(10)],
      negrito: [this.data.operation === ENOperation.create ? false : '', Validators.required],
    });

    if (this.data.operation !== ENOperation.create) {
      this.tituloGroup.setValue({
        id: this.data.object.id,
        texto: this.data.object.textoPagina,
        fonte: this.data.object.tamanhoFonte,
        negrito: this.data.object.negrito
      });
    }

    this.setControlsState(this.data.operation === ENOperation.delete ? false : true);
  }

  ngOnDestroy() {
    if (this._subDialog !== undefined) { this._subDialog.unsubscribe(); }
  }

  onSubmit() {
    this.mantemTitulo = new MantemTituloPagina();
    this.mantemTitulo.idEmissorPagina = this.data.page;
    this.mantemTitulo.idTituloPagina = this.tituloGroup.value.id;
    this.mantemTitulo.negrito = this.tituloGroup.value.negrito;
    this.mantemTitulo.tamanhoFonte = this.tituloGroup.value.fonte;
    this.mantemTitulo.textoPagina = this.tituloGroup.value.texto;
    this.mantemTitulo.action = this.data.operation;
    this.mantemTitulo.posicaoTexto = 2;

    const url = this._interface.appConfig.urlAzureServer + GlobalInterface.ATUALIZA_TITULO_PAGINA;

    console.log('enviou os dados', this.mantemTitulo);

    switch (this.data.operation) {
      case ENOperation.create:
        this._subDialog = this._interface.create(url, this.mantemTitulo).subscribe(
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
        this._subDialog = this._interface.create(url, this.mantemTitulo).subscribe(
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
        this._subDialog = this._interface.create(url, this.mantemTitulo).subscribe(
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
    isEnable ? this.tituloGroup.enable() : this.tituloGroup.disable();
  }

}
