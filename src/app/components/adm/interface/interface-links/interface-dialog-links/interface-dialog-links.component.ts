import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InterfaceService } from 'src/app/services/interface.service';

import { MantemLink, Link } from 'src/app/models/interface.model';
import { ENOperation } from 'src/app/models/enum';
import { GlobalInterface } from './../../../../../shared/global-interface';
import { Subscription } from 'rxjs';
import { ResultAction } from 'src/app/models/config';

export interface DialogData {
  page: number;
  operation: number;
  tituloDialog: string;
  btnCustom: string;
  object: Link;
}

@Component({
  selector: 'app-interface-dialog-links',
  templateUrl: './interface-dialog-links.component.html',
  styleUrls: ['./interface-dialog-links.component.css']
})
export class InterfaceDialogLinksComponent implements OnInit, OnDestroy {
  private _subDialog: Subscription;

  linkGroup: FormGroup;
  resultAction: ResultAction;
  mantemLink: MantemLink;

  constructor(
    private _interface: InterfaceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InterfaceDialogLinksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    this.linkGroup = this.fb.group({
      id: [this.data.operation === ENOperation.create ? 0 : ''],
      descricao: ['', Validators.required],
      destino: ['', Validators.min(1)],
      fonte: ['', Validators.min(14)],
      prioritario: [this.data.operation === ENOperation.create ? false : '', Validators.required]
    });

    if (this.data.operation !== ENOperation.create) {
      this.linkGroup.setValue({
        id: this.data.object.id,
        descricao: this.data.object.descr,
        destino: this.data.object.idEmissorPaginasDestino,
        fonte: this.data.object.tamanhoBotaolink,
        prioritario: this.data.object.iconePrioritario
      });
    }

    this.setControlsState(this.data.operation === ENOperation.delete ? false : true);
  }

  ngOnDestroy() {
    if (this._subDialog !== undefined) { this._subDialog.unsubscribe(); }
  }

  onSubmit() {
    this.mantemLink = new MantemLink();
    this.mantemLink.action = this.data.operation;
    this.mantemLink.descr = this.linkGroup.value.descricao;
    this.mantemLink.iconePrioritario = this.linkGroup.value.prioritario;
    this.mantemLink.idEmissorPagina = this.data.page;
    this.mantemLink.idEmissorPaginasDestino = this.linkGroup.value.destino;
    this.mantemLink.idLink = this.linkGroup.value.id;
    this.mantemLink.tamanhoBotaolink = this.linkGroup.value.fonte;
    this.mantemLink.tipoBotao = 2;

    const url = this._interface.appConfig.urlAzureServer + GlobalInterface.ATUALIZA_LINKS;

    console.log('enviou os dados', this.mantemLink);

    switch (this.data.operation) {
      case ENOperation.create:
        this._subDialog = this._interface.create(url, this.mantemLink).subscribe(
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
        this._subDialog = this._interface.create(url, this.mantemLink).subscribe(
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
        this._subDialog = this._interface.create(url, this.mantemLink).subscribe(
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
    isEnable ? this.linkGroup.enable() : this.linkGroup.disable();
  }
}
