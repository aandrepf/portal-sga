import { Component, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

import { InterfaceService } from 'src/app/services/interface.service';
import { UtilService } from 'src/app/services/util.service';
import { ENOperation } from 'src/app/models/enum';
import { GetTituloLink, TituloLink } from 'src/app/models/interface.model';
import { InterfaceDialogTiltulolinkComponent } from './interface-dialog-tiltulolink/interface-dialog-tiltulolink.component';

@Component({
  selector: 'app-interface-titulo-link',
  templateUrl: './interface-titulo-link.component.html',
  styleUrls: ['./interface-titulo-link.component.css']
})
export class InterfaceTituloLinkComponent implements OnChanges, OnDestroy {
  @Input() idLink: number;
  @Input() idPagina: number;
  @Input() indexTab: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _substLink: Subscription;

  tituloLink: TituloLink[];
  tituloDialog: TituloLink;
  operation: ENOperation;
  dataSource: MatTableDataSource<TituloLink>;

  titulo: string;
  botao: string;
  sizeContent: number;
  displayedColumns: string[] = ['id', 'texto', 'fonte', 'posicao', 'negrito', 'editar', 'deletar'];

  constructor(
    private _interface: InterfaceService, public dialog: MatDialog, public snackBar: MatSnackBar, private _util: UtilService) {}

  ngOnChanges() {
    if (this.idLink !== undefined && this.idPagina !== undefined && this.indexTab === 3) {
      this.getTituloLink();
    }
  }

  ngOnDestroy() {
    if (this._substLink !== undefined) { this._substLink.unsubscribe(); }
  }

  getTituloLink() {
    console.log('id', this.idLink);
    this._substLink = this._interface.getTituloLinks(this.idPagina, this.idLink).subscribe(
      (data: GetTituloLink) => {
        console.log(data);
        this.tituloLink = data.titulosLinkPaginaEmissor;
        this.sizeContent = this.tituloLink.length;
        this.dataSource = new MatTableDataSource(this.tituloLink);
        this.dataSource.paginator = this.paginator;
      },
      err => console.error(err)
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource = new MatTableDataSource(this.tituloLink);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPosicaoTexto(posicao: number): string {
    switch (posicao) {
      case 1:
        return 'À DIREITA';
      case 2:
        return 'CENTRALIZADO';
      case 3:
        return 'À ESQUERDA';
    }
  }

  create() {
    this.operation = ENOperation.create;
    const titulo = 'Cadastrar novo titulo de pagina';
    const btnDescricao = 'CRIAR';
    this.tituloDialog = new TituloLink();
    this.tituloDialog.id = 0;
    console.log('CRIAR', this.tituloDialog, 'operação', this.operation);
    this.openDialog(this.operation, titulo, btnDescricao, this.tituloDialog);
  }

  edit(id: number) {
    this.operation = ENOperation.edit;
    const titulo = 'Editar titulo de pagina cadastrado';
    const btnDescricao = 'EDITAR';
    const pagedata = this.tituloLink.filter(x => x.id === id)[0];
    console.log('EDITAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  delete(id: number) {
    this.operation = ENOperation.delete;
    const titulo = 'Confirmação de exclusão do titulo de pagina';
    const btnDescricao = 'DELETAR';
    const pagedata = this.tituloLink.filter(x => x.id === id)[0];
    console.log('DELETAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  openDialog(opr: number, title: string, descr: string, obj: TituloLink): void {
    const dialogRef = this.dialog.open(InterfaceDialogTiltulolinkComponent, {
      width: '600px',
      data: { page: this.idPagina, link: this.idLink, operation: opr, tituloDialog: title, btnCustom: descr, object: obj}
    });

    console.log('dialogREF', dialogRef);

    dialogRef.afterClosed().subscribe(result => {
      switch (result.CodAction) {
        case ENOperation.create:
          if (result.CodRetorno > 0) {
            this._util.alertDialog(result.CodRetorno, result.MsgRetorno);
          } else {
            this.snackBar.open('Cadastro feito com sucesso', '', { duration: 2500 });
            this.getTituloLink();
          }
        break;
        case ENOperation.edit:
          if (result.CodRetorno > 0) {
            this._util.alertDialog(result.CodRetorno, result.MsgRetorno);
          } else {
            this.snackBar.open('Cadastro atualizado com sucesso', '', { duration: 2500 });
            this.getTituloLink();
            return this.sizeContent > 5 ? this.paginator.firstPage() : false;
          }
        break;
        case ENOperation.delete:
          if (result.CodRetorno > 0) {
            this._util.alertDialog(result.CodRetorno, result.MsgRetorno);
          } else {
            this.snackBar.open('Cadastro excluído com sucesso', '', { duration: 2500 });
            this.getTituloLink();
            return this.sizeContent > 5 ? this.paginator.firstPage() : false;
          }
        break;
      }
    });
  }

}
