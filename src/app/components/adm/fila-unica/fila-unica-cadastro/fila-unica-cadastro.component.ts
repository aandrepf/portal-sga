import { GlobalFilas } from './../../../../shared/global-filas';
import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

import { FilasService } from 'src/app/services/filas.service';
import { UtilService } from './../../../../services/util.service';

import { FilaUnica } from './../../../../models/filas.model';
import { ENOperation } from 'src/app/models/enum';
import { CadastroDialogComponent } from './cadastro-dialog/cadastro-dialog.component';

@Component({
  selector: 'app-fila-unica-cadastro',
  templateUrl: './fila-unica-cadastro.component.html',
  styleUrls: ['./fila-unica-cadastro.component.css']
})
export class FilaUnicaCadastroComponent implements OnInit, OnDestroy {
  @Output() mandaId: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _subsCadastro: Subscription;

  cadastro: FilaUnica[];
  cadastroDialog: FilaUnica;
  operation: ENOperation;
  dataSource: MatTableDataSource<FilaUnica>;

  load = false;
  titulo: string;
  botao: string;
  sizeContent: number;
  displayedColumns: string[] = ['id', 'descricao', 'configurar', 'editar', 'deletar'];

  constructor(
    private _filas: FilasService, public dialog: MatDialog, public snackBar: MatSnackBar, private _util: UtilService) { }

  ngOnInit() {
    this.getFilas();
  }

  ngOnDestroy() {
    if (this._subsCadastro !== undefined) { this._subsCadastro.unsubscribe(); }
  }

  getFilas() {
    this._subsCadastro = this._filas.getCadastroFilas().subscribe(
      (data: FilaUnica[]) => {
        this.cadastro = data;
        console.log('FU', this.cadastro);
        this.sizeContent = this.cadastro.length;
        this.dataSource = new MatTableDataSource(this.cadastro);
        this.dataSource.paginator = this.paginator;
      },
      err => console.error(err)
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource = new MatTableDataSource(this.cadastro);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goTo(id: number, descricao: string) {
    this.cadastroDialog = new FilaUnica();
    this.cadastroDialog.idFilaUnica = id;
    this.cadastroDialog.nomeFila = descricao;
    this.cadastroDialog.closedPage = false;
    this.mandaId.emit(this.cadastroDialog);
    this.operation = ENOperation.read;
  }

  create() {
    this.operation = ENOperation.create;
    const titulo = 'Cadastrar novo grupo de fila única';
    const btnDescricao = 'CRIAR';
    this.cadastroDialog = new FilaUnica();
    this.cadastroDialog.idFilaUnica = 0;
    this.openDialog(this.operation, titulo, btnDescricao, this.cadastroDialog);
  }

  edit(id: number) {
    this.operation = ENOperation.edit;
    const titulo = 'Editar grupo cadastrado';
    const btnDescricao = 'SALVAR';
    const pagedata = this.cadastro.filter(x => x.idFilaUnica === id)[0];
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  delete(id: number) {
    this.operation = ENOperation.delete;
    const titulo = 'Confirmação de exclusão do grupo';
    const btnDescricao = 'DELETAR';
    const pagedata = this.cadastro.filter(x => x.idFilaUnica === id)[0];
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  preview(id: number) {
    this.operation = ENOperation.preview;
  }

  openDialog(opr: number, title: string, descr: string, obj: FilaUnica): void {
    const dialogRef = this.dialog.open(CadastroDialogComponent, {
      width: '600px',
      data: { operation: opr, tituloDialog: title, btnCustom: descr, object: obj}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.operation === ENOperation.create) {
        setTimeout(() => { this.goTo(GlobalFilas.GRUPO_IDENTIFICACAO.idFilaUnica, GlobalFilas.GRUPO_IDENTIFICACAO.nomeFila); }, 200);
      } else if (result === ENOperation.edit) {
        this.snackBar.open('Cadastro atualizado com sucesso', '', { duration: 2500 });
        this.getFilas();
        return this.sizeContent > 5 ? this.paginator.firstPage() : false;
      } else if (result === ENOperation.delete) {
        this.snackBar.open('Cadastro excluído com sucesso', '', { duration: 2500 });
        this.getFilas();
        return this.sizeContent > 5 ? this.paginator.firstPage() : false;
      }
    });
  }
}
