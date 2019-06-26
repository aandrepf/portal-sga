import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

import { IncidentesService } from './../../../services/incidentes.service';
import { UtilService } from './../../../services/util.service';

import { Incidentes , IncidenteStatus } from './../../../models/incidentes.model';
import { ENOperation } from 'src/app/models/enum';

import { IncidentesDialogComponent } from './incidentes-dialog/incidentes-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-incidentes',
  templateUrl: './incidentes.component.html',
  styleUrls: ['./incidentes.component.css']
})
export class IncidentesComponent implements OnInit, OnDestroy {
  @Output() mandaId: EventEmitter<number> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _subsIncidentes: Subscription;
  private _subsStatus: Subscription;

  operation: ENOperation;
  selected = 'ABERTO';
  status: IncidenteStatus;
  incidentesDialog: Incidentes;
  lista: Incidentes[];
  dataSource: MatTableDataSource<Incidentes>;

  load = false;
  titulo: string;
  botao: string;
  sizeContent: number;
  displayedColumns: string[] = [
    'id', 'descricao', 'item', 'tipo', 'unidade', 'usuario', 'status',
    'editar', 'deletar'
  ];

  constructor(
    private _incidentes: IncidentesService, public dialog: MatDialog, public snackBar: MatSnackBar,
    private _util: UtilService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.load = true;
      this.getStatus();
      this.getIncidentes(this.selected); // inicia a lista de status 'ABERTO';
    }, 1500);
  }

  ngOnDestroy() {
    if (this._subsIncidentes !== undefined) { this._subsIncidentes.unsubscribe(); }
    if (this._subsStatus !== undefined) { this._subsStatus.unsubscribe(); }
  }

  getStatus() {
    this._subsStatus = this._incidentes.retornaStatus().subscribe(
      (data: any) => {
        this.status = data;
      },
      err => console.error('ERROR STATUS ==>', err)
    );
  }

  getIncidentes(status: string) {
    this._subsIncidentes = this._incidentes.retornaIncidentes().subscribe(
      (data: Incidentes[]) => {
        this.lista = data.filter(x => x.status === status);
        this.sizeContent = this.lista.length;
        this.dataSource = new MatTableDataSource(this.lista);
        this.dataSource.paginator = this.paginator;
      },
      err => console.error('ERRO INCIDENTES ==>', err)
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource = new MatTableDataSource(this.lista);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goTo(id: number) {
    this.mandaId.emit(id);
    this.operation = ENOperation.read;
    console.log('clicou no id', id, 'operação', this.operation);
  }

  create() {
    this.operation = ENOperation.create;
    const titulo = 'Cadastrar novo incidente';
    const btnDescricao = 'CRIAR';
    this.incidentesDialog = new Incidentes();
    this.incidentesDialog.id = 0;
    this.incidentesDialog.idUsuario = 'USUÁRIO QUE TEM PERMISSÃO';
    this.incidentesDialog.status = 'ABERTO';
    this.incidentesDialog.dataFechamento = null;
    console.log('CRIAR', this.incidentesDialog, 'operação', this.operation);
    this.openDialog(this.operation, titulo, btnDescricao, this.incidentesDialog);
  }

  edit(id: number) {
    this.operation = ENOperation.edit;
    const titulo = 'Editar incidente cadastrado';
    const btnDescricao = 'EDITAR';
    const pagedata = this.lista.filter(x => x.id === id)[0];
    console.log('EDITAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  delete(id: number) {
    this.operation = ENOperation.delete;
    const titulo = 'Confirmação de exclusão de incidente';
    const btnDescricao = 'DELETAR';
    const pagedata = this.lista.filter(x => x.id === id)[0];
    console.log('DELETAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  preview(id: number) {
    this.operation = ENOperation.preview;
    console.log('PREVIEW', id, 'operação', this.operation);
  }

  openDialog(opr: number, title: string, descr: string, obj: Incidentes): void {
    const dialogRef = this.dialog.open(IncidentesDialogComponent, {
      width: '600px',
      data: { operation: opr, tituloDialog: title, btnCustom: descr, object: obj}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === ENOperation.create) {
        this.snackBar.open('Cadastro feito com sucesso', '', { duration: 2500 });
        this.getStatus();
        this.getIncidentes(this.selected);
      } else if (result === ENOperation.edit) {
        this.snackBar.open('Cadastro atualizado com sucesso', '', { duration: 2500 });
        this.getStatus();
        this.getIncidentes(this.selected);
        return this.sizeContent > 5 ? this.paginator.firstPage() : false;
      } else if (result === ENOperation.delete) {
        this.snackBar.open('Cadastro excluído com sucesso', '', { duration: 2500 });
        this.getStatus();
        this.getIncidentes(this.selected);
        return this.sizeContent > 5 ? this.paginator.firstPage() : false;
      }
    });
  }
}
