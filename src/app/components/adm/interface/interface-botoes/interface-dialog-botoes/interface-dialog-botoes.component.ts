import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InterfaceService } from 'src/app/services/interface.service';
import { GlobalInterface } from './../../../../../shared/global-interface';
import { Botoes, MantemBotoes, ListBotao } from 'src/app/models/interface.model';
import { ENOperation } from 'src/app/models/enum';
import { Subscription } from 'rxjs';
import { ResultAction } from 'src/app/models/config';

export interface DialogData {
  page: number;
  operation: number;
  tituloDialog: string;
  btnCustom: string;
  object: Botoes;
}

@Component({
  selector: 'app-interface-dialog-botoes',
  templateUrl: './interface-dialog-botoes.component.html',
  styleUrls: ['./interface-dialog-botoes.component.css']
})
export class InterfaceDialogBotoesComponent implements OnInit, OnDestroy {
  private _subDialog: Subscription;

  botaoGroup: FormGroup;
  resultAction: ResultAction;
  listaBotoes: Botoes[];
  botaoSelecionado: Botoes;
  mantemBotao: MantemBotoes;

  constructor(
    private _interface: InterfaceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InterfaceDialogBotoesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    this.botaoGroup = this.fb.group({
      id: [this.data.operation === ENOperation.create ? 0 : ''],
      descricao: [''],
      fonte: ['', Validators.min(10)],
      imagem: [this.data.operation === ENOperation.create ? false : '', Validators.required],
      prioritario: [this.data.operation === ENOperation.create ? false : '', Validators.required],
      action: ['']
    });

    if (this.data.operation !== ENOperation.create) {
      this.botaoGroup.setValue({
        id: this.data.object.id,
        descricao: this.data.object.textoBotao,
        fonte: this.data.object.tamanhoBotao,
        imagem : this.data.object.hasImage,
        prioritario: this.data.object.iconePrioritario,
        action: this.data.operation
      });
    }

    this.getGrabBotoes();

    this.setControlsState(this.data.operation === ENOperation.delete ? false : true);
  }

  ngOnDestroy() {
    if (this._subDialog !== undefined) { this._subDialog.unsubscribe(); }
  }

  getGrabBotoes() {
    if (this.data.operation === 1) {
      this._subDialog = this._interface.listaBotoes(this.data.page).subscribe(
        (data: ListBotao) => {
          this.listaBotoes = data.tbBotoes;
        },
        err => console.error(err)
      );
    } else { return false; }
  }

  geraCadastro(id: number) {
    this.mantemBotao = new MantemBotoes();
    this.botaoSelecionado = this.listaBotoes.filter(x => x.idBotao === id)[0];
    this.mantemBotao.descLocalAtendimento = this.botaoSelecionado.descLocalAtendimento;
    this.mantemBotao.hasImage = this.botaoSelecionado.hasImage;
    this.mantemBotao.iconePrioritario = this.botaoSelecionado.iconePrioritario;
    this.mantemBotao.idBotao = this.botaoSelecionado.idBotao;
    this.mantemBotao.idLocalAtendimento = this.botaoSelecionado.idLocalAtendimento;
    this.mantemBotao.nomeImage = this.botaoSelecionado.nomeImage;
    this.mantemBotao.tamanhoBotao = this.botaoSelecionado.tamanhoBotao;
    this.mantemBotao.textoBotao = this.botaoSelecionado.textoBotao;
    this.mantemBotao.idEmissorPagina = this.data.page;
    this.mantemBotao.idEmissorBotao = 0;
    this.mantemBotao.tipoBotao = 3;
    this.mantemBotao.action = this.data.operation;
    this.botaoGroup.setValue({
      id: this.data.object.id,
      descricao: this.mantemBotao.textoBotao,
      fonte: this.mantemBotao.tamanhoBotao,
      imagem : this.mantemBotao.hasImage,
      prioritario: this.mantemBotao.iconePrioritario,
      action: this.data.operation
    });
    this.setControlsState(false);
  }

  cadastroDeleta() {
    this.mantemBotao.descLocalAtendimento = this.data.object.descLocalAtendimento;
    this.mantemBotao.hasImage = this.data.object.hasImage;
    this.mantemBotao.iconePrioritario = this.data.object.iconePrioritario;
    this.mantemBotao.idBotao = this.data.object.id;
    this.mantemBotao.idLocalAtendimento = this.data.object.idLocalAtendimento;
    this.mantemBotao.nomeImage = this.data.object.nomeImage;
    this.mantemBotao.tamanhoBotao = this.data.object.tamanhoBotao;
    this.mantemBotao.textoBotao = this.data.object.textoBotao;
    this.mantemBotao.idEmissorPagina = this.data.page;
    this.mantemBotao.idEmissorBotao = this.data.object.id;
    this.mantemBotao.tipoBotao = this.data.object.tipoBotao;
    this.mantemBotao.action = this.data.operation;
  }

  onSubmit() {
    const url = this._interface.appConfig.urlAzureServer + GlobalInterface.ATUALIZA_BOTOES;

    switch (this.data.operation) {
      case ENOperation.create:
        this._subDialog = this._interface.create(url, this.mantemBotao).subscribe(
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
      this.mantemBotao = new MantemBotoes();
      this.cadastroDeleta();
        this._subDialog = this._interface.create(url, this.mantemBotao).subscribe(
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
    isEnable ? this.botaoGroup.enable() : this.botaoGroup.disable();
  }
}
