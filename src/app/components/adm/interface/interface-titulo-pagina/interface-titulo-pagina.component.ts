import { Component, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

import { InterfaceService } from 'src/app/services/interface.service';
import { UtilService } from 'src/app/services/util.service';
import { ENOperation } from 'src/app/models/enum';

import { Titulo, GetTituloPagina } from 'src/app/models/interface.model';
import { InterfaceDialogTituloComponent } from './interface-dialog-titulo/interface-dialog-titulo.component';

@Component({
  selector: 'app-interface-titulo-pagina',
  templateUrl: './interface-titulo-pagina.component.html',
  styleUrls: ['./interface-titulo-pagina.component.css']
})
export class InterfaceTituloPaginaComponent implements OnChanges, OnDestroy {
  @Input() idPagina: number;
  @Input() indexTab: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _subsTituloPagina: Subscription;

  tituloPagina: Titulo[];
  tituloDialog: Titulo;
  operation: ENOperation;
  dataSource: MatTableDataSource<Titulo>;

  titulo: string;
  botao: string;
  sizeContent: number;
  displayedColumns: string[] = ['id', 'texto', 'fonte', 'negrito', 'editar', 'deletar'];

  constructor(
    private _interface: InterfaceService, public dialog: MatDialog, public snackBar: MatSnackBar, private _util: UtilService
  ) {}

  ngOnChanges() {
    if (this.idPagina !== undefined && this.indexTab === 1) {
      console.log('inputs par o titulo pagina', this.idPagina, this.indexTab);
      this.getTituloPaginas();
    }
  }

  ngOnDestroy() {
    if (this._subsTituloPagina !== undefined) { this._subsTituloPagina.unsubscribe(); }
  }

  getTituloPaginas() {
    this._subsTituloPagina = this._interface.getTitulos(this.idPagina).subscribe(
      (data: GetTituloPagina) => {
        console.log('data', data);
        this.tituloPagina = data.titulosPaginaEmissor;
        this.sizeContent = this.tituloPagina.length;
        this.dataSource = new MatTableDataSource(this.tituloPagina);
        this.dataSource.paginator = this.paginator;
      }, err => console.error(err)
    );
    /*this._subsTituloPagina = this._interface.baixaInterfacePagina(this.idPagina).subscribe(
      (data: BaixaInterfaceEmissorPagina) => {
        const dados = data.InterfaceEmissorPagina;
        this.tituloPagina = dados.InterfaceEmissorTituloPagina;
        this.sizeContent = this.tituloPagina.length;
        this.dataSource = new MatTableDataSource(this.tituloPagina);
        this.dataSource.paginator = this.paginator;
      },
      err => console.error(err)
    );*/
  }

  applyFilter(filterValue: string) {
    this.dataSource = new MatTableDataSource(this.tituloPagina);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create() {
    this.operation = ENOperation.create;
    const titulo = 'Cadastrar novo titulo de pagina';
    const btnDescricao = 'CRIAR';
    this.tituloDialog = new Titulo();
    this.tituloDialog.id = 0;
    console.log('CRIAR', this.tituloDialog, 'operação', this.operation);
    this.openDialog(this.operation, titulo, btnDescricao, this.tituloDialog);
  }

  edit(id: number) {
    this.operation = ENOperation.edit;
    const titulo = 'Editar titulo de pagina cadastrado';
    const btnDescricao = 'EDITAR';
    const pagedata = this.tituloPagina.filter(x => x.id === id)[0];
    console.log('EDITAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  delete(id: number) {
    this.operation = ENOperation.delete;
    const titulo = 'Confirmação de exclusão do titulo de pagina';
    const btnDescricao = 'DELETAR';
    const pagedata = this.tituloPagina.filter(x => x.id === id)[0];
    console.log('DELETAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  openDialog(opr: number, title: string, descr: string, obj: Titulo): void {
    const dialogRef = this.dialog.open(InterfaceDialogTituloComponent, {
      width: '600px',
      data: { page: this.idPagina, operation: opr, tituloDialog: title, btnCustom: descr, object: obj}
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result.CodAction) {
        case ENOperation.create:
          if (result.CodRetorno > 0) {
            this._util.alertDialog(result.CodRetorno, result.MsgRetorno);
          } else {
            this.snackBar.open('Cadastro feito com sucesso', '', { duration: 2500 });
            this.getTituloPaginas();
          }
        break;
        case ENOperation.edit:
          if (result.CodRetorno > 0) {
            this._util.alertDialog(result.CodRetorno, result.MsgRetorno);
          } else {
            this.snackBar.open('Cadastro atualizado com sucesso', '', { duration: 2500 });
            this.getTituloPaginas();
            return this.sizeContent > 5 ? this.paginator.firstPage() : false;
          }
        break;
        case ENOperation.delete:
          if (result.CodRetorno > 0) {
            this._util.alertDialog(result.CodRetorno, result.MsgRetorno);
          } else {
            this.snackBar.open('Cadastro excluído com sucesso', '', { duration: 2500 });
            this.getTituloPaginas();
            return this.sizeContent > 5 ? this.paginator.firstPage() : false;
          }
        break;
      }
    });
  }
}
