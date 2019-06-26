import { Component, Input, OnChanges, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

import { InterfaceService } from 'src/app/services/interface.service';
import { UtilService } from 'src/app/services/util.service';
import { ENOperation } from 'src/app/models/enum';
import { Link, GetLink } from 'src/app/models/interface.model';
import { ContentAtivo } from './../../../../models/config';

import { InterfaceDialogLinksComponent } from './interface-dialog-links/interface-dialog-links.component';

@Component({
  selector: 'app-interface-links',
  templateUrl: './interface-links.component.html',
  styleUrls: ['./interface-links.component.css']
})
export class InterfaceLinksComponent implements OnChanges, OnDestroy {
  @Output() mandaIdLink: EventEmitter<any> = new EventEmitter();
  @Input() idPagina: number;
  @Input() indexTab: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _subsLinks: Subscription;

  links: Link[];
  linkDialog: Link;
  operation: ENOperation;
  dataSource: MatTableDataSource<Link>;
  envia: ContentAtivo = new ContentAtivo();

  titulo: string;
  botao: string;
  sizeContent: number;
  displayedColumns: string[] = ['id', 'descricao', 'destino', 'fonte', 'prioritario', 'editar', 'deletar'];

  constructor(
    private _interface: InterfaceService, public dialog: MatDialog, public snackBar: MatSnackBar, private _util: UtilService
  ) {}

  ngOnChanges() {
    if (this.idPagina !== undefined && this.indexTab === 2) {
      console.log('input para os links', this.idPagina, this.indexTab);
      this.getLinks();
    }
  }

  ngOnDestroy() {
    if (this._subsLinks !== undefined) { this._subsLinks.unsubscribe(); }
  }

  getLinks() {
    this._subsLinks = this._interface.getLinks(this.idPagina).subscribe(
      (data: GetLink) => {
        this.links = data.linksPaginaEmissor;
        this.sizeContent = this.links.length;
        this.dataSource = new MatTableDataSource(this.links);
        this.dataSource.paginator = this.paginator;
      },
      err => console.error(err)
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource = new MatTableDataSource(this.links);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goTo(id: number) {
    const item = this.links.filter(x => {
      if (x.id === id) { return x.interfaceEmissorTituloLink;  }
    }).map(x => x.interfaceEmissorTituloLink)[0];
    this.envia.id = id;
    this.envia.page = this.idPagina;
    this.envia.content = item;
    this.mandaIdLink.emit(this.envia);
    this.operation = ENOperation.read;
    console.log('clicou no id', id, 'operação', this.operation);
  }

  create() {
    this.operation = ENOperation.create;
    const titulo = 'Cadastrar novo link';
    const btnDescricao = 'CRIAR';
    this.linkDialog = new Link();
    this.linkDialog.id = 0;
    console.log('CRIAR', this.linkDialog, 'operação', this.operation);
    this.openDialog(this.operation, titulo, btnDescricao, this.linkDialog);
  }

  edit(id: number) {
    this.operation = ENOperation.edit;
    const titulo = 'Editar link cadastrado';
    const btnDescricao = 'EDITAR';
    const pagedata = this.links.filter(x => x.id === id)[0];
    console.log('EDITAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  delete(id: number) {
    this.operation = ENOperation.delete;
    const titulo = 'Confirmação de exclusão do link';
    const btnDescricao = 'DELETAR';
    const pagedata = this.links.filter(x => x.id === id)[0];
    console.log('DELETAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  openDialog(opr: number, title: string, descr: string, obj: Link): void {
    const dialogRef = this.dialog.open(InterfaceDialogLinksComponent, {
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
            this.getLinks();
          }
        break;
        case ENOperation.edit:
          if (result.CodRetorno > 0) {
            this._util.alertDialog(result.CodRetorno, result.MsgRetorno);
          } else {
            this.snackBar.open('Cadastro atualizado com sucesso', '', { duration: 2500 });
            this.getLinks();
            return this.sizeContent > 5 ? this.paginator.firstPage() : false;
          }
        break;
        case ENOperation.delete:
          if (result.CodRetorno > 0) {
            this._util.alertDialog(result.CodRetorno, result.MsgRetorno);
          } else {
            this.snackBar.open('Cadastro excluído com sucesso', '', { duration: 2500 });
            this.getLinks();
            return this.sizeContent > 5 ? this.paginator.firstPage() : false;
          }
        break;
      }
    });
  }
}
