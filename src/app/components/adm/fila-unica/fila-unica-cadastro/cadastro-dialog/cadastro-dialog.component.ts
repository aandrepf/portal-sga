import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FilasService } from 'src/app/services/filas.service';

import { FilaUnica } from 'src/app/models/filas.model';
import { ENOperation } from 'src/app/models/enum';
import { Subscription } from 'rxjs';
import { ResultAction } from 'src/app/models/config';
import { GlobalFilas } from 'src/app/shared/global-filas';

export interface DialogData {
  operation: number;
  tituloDialog: string;
  btnCustom: string;
  object: FilaUnica;
}

@Component({
  selector: 'app-cadastro-dialog',
  templateUrl: './cadastro-dialog.component.html',
  styleUrls: ['./cadastro-dialog.component.css']
})
export class CadastroDialogComponent implements OnInit, OnDestroy {
  private _subDialog: Subscription;

  filas: FilaUnica;
  filaGroup: FormGroup;
  resultAction: ResultAction;

  constructor(
    private _filas: FilasService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CadastroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.filaGroup = this.fb.group({
      id: [this.data.operation === ENOperation.create ? 0 : ''],
      descricao: ['', Validators.required]
    });

    if (this.data.operation !== ENOperation.create) {
      this.filaGroup.setValue({
        id: this.data.object.idFilaUnica,
        descricao: this.data.object.nomeFila
      });
    }

    this.setControlsState(this.data.operation === ENOperation.delete ? false : true);
  }

  ngOnDestroy() {
    if (this._subDialog !== undefined) { this._subDialog.unsubscribe(); }
  }

  onSubmit() {
    this.filas = new FilaUnica();
    this.filas.idFilaUnica = this.filaGroup.value.id;
    this.filas.nomeFila = this.filaGroup.value.descricao;
    this.filas.operation = this.data.operation;

    switch (this.data.operation) {
      case ENOperation.create:
        GlobalFilas.GRUPO_IDENTIFICACAO = this.filas;
        this.dialogRef.close(GlobalFilas.GRUPO_IDENTIFICACAO);
      break;
      case ENOperation.edit:
        this._subDialog = this._filas.updateFilas(this.filas.idFilaUnica, this.filas).subscribe(
          () => {
            this.dialogRef.close(this.data.operation);
          },
          err => console.error('ERRO', err)
        );
      break;
      case ENOperation.delete:
        this._subDialog = this._filas.deleteFilas(this.filas.idFilaUnica).subscribe(
          () => {
            this.dialogRef.close(this.data.operation);
          },
          err => console.error('ERRO', err)
        );
      break;
    }
  }

  setControlsState(isEnable: boolean) {
    isEnable ? this.filaGroup.enable() : this.filaGroup.disable();
  }
}
