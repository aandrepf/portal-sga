import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InterfaceService } from 'src/app/services/interface.service';

import { TituloLink, MantemTituloLink } from 'src/app/models/interface.model';
import { ENOperation } from 'src/app/models/enum';
import { GlobalInterface } from './../../../../../shared/global-interface';
import { Subscription } from 'rxjs';
import { ResultAction } from 'src/app/models/config';

export interface DialogData {
  page: number;
  link: number;
  operation: number;
  tituloDialog: string;
  btnCustom: string;
  object: TituloLink;
}

@Component({
  selector: 'app-interface-dialog-tiltulolink',
  templateUrl: './interface-dialog-tiltulolink.component.html',
  styleUrls: ['./interface-dialog-tiltulolink.component.css']
})
export class InterfaceDialogTiltulolinkComponent implements OnInit, OnDestroy {
  private _subDialog: Subscription;

  tituloGroup: FormGroup;
  resultAction: ResultAction;
  mantemTitulo: MantemTituloLink;

  constructor(
    private _interface: InterfaceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InterfaceDialogTiltulolinkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    this.tituloGroup = this.fb.group({
      id: [this.data.operation === ENOperation.create ? 0 : ''],
      texto: ['', Validators.required],
      fonte: ['', Validators.min(14)],
      posicao: ['', Validators.required],
      negrito: [this.data.operation === ENOperation.create ? false : '', Validators.required],
    });

    if (this.data.operation !== ENOperation.create) {
      this.tituloGroup.setValue({
        id: this.data.object.id,
        texto: this.data.object.textoLink,
        fonte: this.data.object.tamanhoFonte,
        posicao: this.data.object.posicaoTexto.toString(),
        negrito: this.data.object.negrito
      });
    }

    this.setControlsState(this.data.operation === ENOperation.delete ? false : true);
  }

  ngOnDestroy() {
    if (this._subDialog !== undefined) { this._subDialog.unsubscribe(); }
  }

  onSubmit() {
    this.mantemTitulo = new MantemTituloLink();
    this.mantemTitulo.action = this.data.operation;
    this.mantemTitulo.idEmissorPagina = this.data.page;
    this.mantemTitulo.idLink = this.data.link;
    this.mantemTitulo.idTituloLink = this.tituloGroup.value.id;
    this.mantemTitulo.negrito = this.tituloGroup.value.negrito;
    this.mantemTitulo.tamanhoFonte = this.tituloGroup.value.fonte;
    this.mantemTitulo.textoLink = this.tituloGroup.value.texto;
    this.mantemTitulo.posicaoTexto = +this.tituloGroup.value.posicao;

    const url = this._interface.appConfig.urlAzureServer + GlobalInterface.ATUALIZA_TITULO_LINK;

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
