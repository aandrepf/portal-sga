import { Component, Input, OnChanges, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

import { InterfaceService } from 'src/app/services/interface.service';
import { UtilService } from 'src/app/services/util.service';
import { ENOperation } from 'src/app/models/enum';
import { GetBotao, Botoes } from 'src/app/models/interface.model';

import { InterfaceDialogBotoesComponent } from './interface-dialog-botoes/interface-dialog-botoes.component';

@Component({
  selector: 'app-interface-botoes',
  templateUrl: './interface-botoes.component.html',
  styleUrls: ['./interface-botoes.component.css']
})
export class InterfaceBotoesComponent implements OnChanges, OnDestroy {
  @Input() idPagina: number;
  @Input() indexTab: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _subsBotoes: Subscription;

  botoes: Botoes[];
  botoesDialog: Botoes;
  operation: ENOperation;
  dataSource: MatTableDataSource<Botoes>;

  titulo: string;
  botao: string;
  sizeContent: number;
  displayedColumns: string[] = ['id', 'descricao', 'fonte', 'imagem', 'prioritario', 'deletar'];

  constructor(
    private _interface: InterfaceService, public dialog: MatDialog, public snackBar: MatSnackBar, private _util: UtilService
  ) {}

  ngOnChanges() {
    if (this.idPagina !== undefined && this.indexTab === 3 || this.indexTab === 4) {
      console.log('input para os botoes', this.idPagina, this.indexTab);
      this.getBotoes();
    }
  }

  ngOnDestroy() {
    if (this._subsBotoes !== undefined) { this._subsBotoes.unsubscribe(); }
  }

  getBotoes() {
    this._subsBotoes = this._interface.getBotoes(this.idPagina).subscribe(
      (data: GetBotao) => {
        this.botoes = data.botoesPaginaEmissor;
        this.sizeContent = this.botoes.length;
        this.dataSource = new MatTableDataSource(this.botoes);
        this.dataSource.paginator = this.paginator;
      },
      err => console.error(err)
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource = new MatTableDataSource(this.botoes);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  create() {
    this.operation = ENOperation.create;
    const titulo = 'Cadastrar novo botão';
    const btnDescricao = 'CRIAR';
    this.botoesDialog = new Botoes();
    this.botoesDialog.id = 0;
    this.botoesDialog.idBotao = 0;
    console.log('CRIAR', this.botoesDialog, 'operação', this.operation);
    this.openDialog(this.operation, titulo, btnDescricao, this.botoesDialog);
  }

  edit(id: number) {
    this.operation = ENOperation.edit;
    const titulo = 'Editar botão cadastrado';
    const btnDescricao = 'EDITAR';
    const pagedata = this.botoes.filter(x => x.idBotao === id)[0];
    console.log('EDITAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  delete(id: number) {
    this.operation = ENOperation.delete;
    const titulo = 'Confirmação de exclusão do botão';
    const btnDescricao = 'DELETAR';
    const pagedata = this.botoes.filter(x => x.idBotao === id)[0];
    console.log('DELETAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  openDialog(opr: number, title: string, descr: string, obj: Botoes): void {
    const dialogRef = this.dialog.open(InterfaceDialogBotoesComponent, {
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
            this.getBotoes();
          }
        break;
        case ENOperation.edit:
          if (result.CodRetorno > 0) {
            this._util.alertDialog(result.CodRetorno, result.MsgRetorno);
          } else {
            this.snackBar.open('Cadastro atualizado com sucesso', '', { duration: 2500 });
            this.getBotoes();
            return this.sizeContent > 5 ? this.paginator.firstPage() : false;
          }
        break;
        case ENOperation.delete:
          if (result.CodRetorno > 0) {
            this._util.alertDialog(result.CodRetorno, result.MsgRetorno);
          } else {
            this.snackBar.open('Cadastro excluído com sucesso', '', { duration: 2500 });
            this.getBotoes();
            return this.sizeContent > 5 ? this.paginator.firstPage() : false;
          }
        break;
      }
    });
  }
}
