import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

import { InterfaceService } from 'src/app/services/interface.service';
import { IncidentesService } from 'src/app/services/incidentes.service';

import { Incidentes, ItemEquipamento, TipoEquipamento, Unidades, IncidenteStatus } from 'src/app/models/incidentes.model';
import { ENOperation } from 'src/app/models/enum';
import { Subscription } from 'rxjs';
import { ResultAction } from 'src/app/models/config';

export interface DialogData {
  operation: number;
  tituloDialog: string;
  btnCustom: string;
  object: Incidentes;
}

@Component({
  selector: 'app-incidentes-dialog',
  templateUrl: './incidentes-dialog.component.html',
  styleUrls: ['./incidentes-dialog.component.css']
})
export class IncidentesDialogComponent implements OnInit, OnDestroy {
  private _subDialog: Subscription;

  today = new Date();
  jstoday = '';
  selected;

  incidenteGroup: FormGroup;
  resultAction: ResultAction;
  mantemIncidentes: Incidentes;
  edited = false;
  itens: ItemEquipamento[];
  tipo: TipoEquipamento[];
  unidades: Unidades[];
  status: IncidenteStatus[];

  constructor(
    private _incidentes: IncidentesService,
    private _interface: InterfaceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<IncidentesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  ngOnInit() {
    this.jstoday = formatDate(Date.now(), 'yyyy-MM-dd H:mm:ss', 'pt-BR');
    console.log('DIA HJ', this.jstoday);


    this.incidenteGroup = this.fb.group({
      id: [this.data.operation === ENOperation.create ? this.data.object.id : ''],
      unidade: ['', Validators.required],
      usuario: [this.data.operation === ENOperation.create ? this.data.object.idUsuario : '', Validators.required],
      status: [this.data.operation === ENOperation.create ? this.data.object.status : '', Validators.required],
      tipo: ['', Validators.required],
      item: ['', Validators.required],
      // tslint:disable-next-line:max-line-length
      abertura: [this.data.operation === ENOperation.create ? formatDate(Date.now(), 'yyyy-MM-dd H:mm:ss', 'pt-BR') : '', Validators.required],
      fechamento: [''],
      fechaStatus: [''],
      descricao: ['', Validators.required]
    });

    if (this.data.operation !== ENOperation.create) {
      this.incidenteGroup.setValue({
        id: this.data.object.id,
        unidade: this.data.object.codUnidade,
        usuario: this.data.object.idUsuario,
        status: this.data.object.status,
        tipo: this.data.object.tipoEquipamento,
        item: this.data.object.itemEquipamento,
        abertura: formatDate(this.data.object.dataAbertura, 'yyyy-MM-dd H:mm:ss', 'pt-BR'),
        // tslint:disable-next-line:max-line-length
        fechamento: this.data.object.dataFechamento === null ? null : formatDate(this.data.object.dataFechamento, 'yyyy-MM-dd H:mm:ss', 'pt-BR'),
        fechaStatus: formatDate(Date.now(), 'yyyy-MM-dd H:mm:ss', 'pt-BR'),
        descricao: this.data.object.descricao
      });
      this.listaStatus();
    } else {
      this.montaSelects();
      this.listaUnidades();
    }

    if (this.data.operation === ENOperation.edit) {
      if (this.selected === 'CANCELADO' || this.selected === 'FINALIZADO') {
        console.log('EDITADO?', this.edited);
      }
    }

    this.setControlsState(this.data.operation === ENOperation.delete ? false : true);
  }

  ngOnDestroy() {
    if (this._subDialog !== undefined) { this._subDialog.unsubscribe(); }
  }

  montaSelects() {
    this._subDialog = this._incidentes.retornaTipoEquipamento().subscribe(
      (data: any[]) => {
        this.tipo = data;
      },
      err => console.error('ERROR TIPO ===>', err)
    );
  }

  updateSelect(selected: any) {
    this.selected = selected;
    console.log('SELECIONADO', this.selected);
  }

  montaTipo(tipo: number) {
    this._subDialog = this._incidentes.retornaItemEquipamento().subscribe(
      (data: any[]) => {
        this.itens = data.filter(x => x.tipoEquipamento === tipo);
        console.log('LISTA', this.itens);
      },
      err => console.error('ERROR ITEM ===>', err)
    );
  }

  listaUnidades() {
    this._subDialog = this._incidentes.retornaUnidades().subscribe(
      (data: any[]) => {
        this.unidades = data;
      },
      err => console.error('ERROR UNIDADES ===>', err)
    );
  }

  listaStatus() {
    this._subDialog = this._incidentes.retornaStatus().subscribe(
      (data: any[]) => {
        this.status = data;
      },
      err => console.error('ERROR STATUS ===>', err)
    );
  }

  onSubmit() {
    this.mantemIncidentes = new Incidentes();
    this.mantemIncidentes.id = this.incidenteGroup.value.id;
    this.mantemIncidentes.codUnidade = this.incidenteGroup.value.unidade;
    this.mantemIncidentes.idUsuario = this.incidenteGroup.value.usuario;
    this.mantemIncidentes.status = this.incidenteGroup.value.status;
    this.mantemIncidentes.tipoEquipamento = this.incidenteGroup.value.tipo;
    this.mantemIncidentes.itemEquipamento = this.incidenteGroup.value.item;
    this.mantemIncidentes.dataAbertura = this.incidenteGroup.value.abertura;
    if (this.selected === 'FINALIZADO' || this.selected === 'CANCELADO') {
      this.mantemIncidentes.dataFechamento = this.incidenteGroup.value.fechaStatus;
    } else if (this.data.object.dataFechamento !== null) {
      this.mantemIncidentes.dataFechamento = this.data.object.dataFechamento;
    } else {
      this.mantemIncidentes.dataFechamento = null;
    }
    this.mantemIncidentes.descricao = this.incidenteGroup.value.descricao;

    console.log('enviou os dados', this.mantemIncidentes);

    const url = this._incidentes.urlIncidentes;

    switch (this.data.operation) {
      case ENOperation.create:
        this._subDialog = this._incidentes.create(url, this.mantemIncidentes).subscribe(
          () => {
            this.dialogRef.close(this.data.operation);
          },
          err => console.error('ERRO', err)
        );
      break;
      case ENOperation.edit:
        this._subDialog = this._incidentes.update(url, this.mantemIncidentes.id, this.mantemIncidentes).subscribe(
          () => {
            this.dialogRef.close(this.data.operation);
          },
          err => console.error('ERRO', err)
        );
      break;
      case ENOperation.delete:
        this._subDialog = this._incidentes.delete(url, this.mantemIncidentes.id).subscribe(
          () => {
            this.dialogRef.close(this.data.operation);
          },
          err => console.error('ERRO', err)
        );
      break;
    }
  }

  setControlsState(isEnable: boolean) {
    isEnable ? this.incidenteGroup.enable() : this.incidenteGroup.disable();
  }
}
