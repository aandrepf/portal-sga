import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

import { InterfaceService } from './../../../../services/interface.service';
import { UtilService } from './../../../../services/util.service';

import { GetPaginasEmissor, Paginas } from './../../../../models/interface.model';
import { ENOperation } from 'src/app/models/enum';

import { InterfaceDialogComponent } from './interface-dialog/interface-dialog.component';

@Component({
  selector: 'app-interface-paginas',
  templateUrl: './interface-paginas.component.html',
  styleUrls: ['./interface-paginas.component.css']
})
export class InterfacePaginasComponent implements OnInit, OnDestroy {
  @Output() mandaId: EventEmitter<number> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _subsPagina: Subscription;

  paginas: Paginas[];
  paginasDialog: Paginas;
  operation: ENOperation;
  dataSource: MatTableDataSource<Paginas>;

  load = false;
  public acParam: string;
  public idParam: string;
  titulo: string;
  botao: string;
  sizeContent: number;
  displayedColumns: string[] = ['id', 'descricao', 'prioritario', 'voltar', 'preview', 'editar', 'deletar'];

  constructor(
    private _interface: InterfaceService, public dialog: MatDialog, public snackBar: MatSnackBar, private _util: UtilService,
    private router: Router, private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.acParam = this.route.snapshot.queryParamMap.get('ac');
    this.idParam = this.route.snapshot.queryParamMap.get('id');
    this.getPaginas();
  }

  ngOnDestroy() {
    if (this._subsPagina !== undefined) { this._subsPagina.unsubscribe(); }
  }

  getPaginas() {
    this._subsPagina = this._interface.getPaginas().subscribe(
      (data: GetPaginasEmissor) => {
        this.paginas = data.paginasEmissor;
        this.sizeContent = this.paginas.length;
        this.dataSource = new MatTableDataSource(this.paginas);
        this.dataSource.paginator = this.paginator;
      },
      err => console.error(err)
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource = new MatTableDataSource(this.paginas);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goTo(id: number) {
    this.mandaId.emit(id);
    this.operation = ENOperation.read;
    console.log('clicou no id', id, 'operação', this.operation);
  }

  create() {
    this.operation = ENOperation.create;
    const titulo = 'Cadastrar nova pagina';
    const btnDescricao = 'CRIAR';
    this.paginasDialog = new Paginas();
    this.paginasDialog.id = 0;
    console.log('CRIAR', this.paginasDialog, 'operação', this.operation);
    this.openDialog(this.operation, titulo, btnDescricao, this.paginasDialog);
  }

  edit(id: number) {
    this.operation = ENOperation.edit;
    const titulo = 'Editar pagina cadastrada';
    const btnDescricao = 'EDITAR';
    const pagedata = this.paginas.filter(x => x.id === id)[0];
    console.log('EDITAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  delete(id: number) {
    this.operation = ENOperation.delete;
    const titulo = 'Confirmação de exclusão da pagina';
    const btnDescricao = 'DELETAR';
    const pagedata = this.paginas.filter(x => x.id === id)[0];
    console.log('DELETAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  preview(id: number) {
    this.operation = ENOperation.preview;
    console.log('PREVIEW', id, 'operação', this.operation);
    this.router.navigate(['/preview-interface', id], { queryParams: { 'ac': this.acParam, 'id': this.idParam } });
  }

  openDialog(opr: number, title: string, descr: string, obj: Paginas): void {
    const dialogRef = this.dialog.open(InterfaceDialogComponent, {
      width: '600px',
      data: { operation: opr, tituloDialog: title, btnCustom: descr, object: obj}
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result.CodAction) {
        case ENOperation.create:
          if (result.CodRetorno > 0) {
            this._util.alertDialog(result.CodRetorno, result.MsgRetorno);
          } else {
            this.snackBar.open('Cadastro feito com sucesso', '', { duration: 2500 });
            this.getPaginas();
          }
        break;
        case ENOperation.edit:
          if (result.CodRetorno > 0) {
            this._util.alertDialog(result.CodRetorno, result.MsgRetorno);
          } else {
            this.snackBar.open('Cadastro atualizado com sucesso', '', { duration: 2500 });
            this.getPaginas();
            return this.sizeContent > 5 ? this.paginator.firstPage() : false;
          }
        break;
        case ENOperation.delete:
          if (result.CodRetorno > 0) {
            this._util.alertDialog(result.CodRetorno, result.MsgRetorno);
          } else {
            this.snackBar.open('Cadastro excluído com sucesso', '', { duration: 2500 });
            this.getPaginas();
            return this.sizeContent > 5 ? this.paginator.firstPage() : false;
          }
        break;
      }
    });
  }
}
