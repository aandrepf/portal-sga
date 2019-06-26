import { Component, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatSnackBar, MatPaginator } from '@angular/material';
import { Subscription, Subject } from 'rxjs';

import { FeriadoService } from './../../../../services/feriado.service';
import { UtilService } from 'src/app/services/util.service';
import { ENOperation } from 'src/app/models/enum';

import { CadastroDialogComponent } from './cadastro-dialog/cadastro-dialog.component';
import { Feriado, UnidadeFederacao, MunicipioByEstado } from 'src/app/models/calendar.model';

@Component({
  selector: 'app-feriado-cadastro',
  templateUrl: './feriado-cadastro.component.html',
  styleUrls: ['./feriado-cadastro.component.css']
})
export class FeriadoCadastroComponent implements OnChanges, OnDestroy {
  @Input() diaCadastro;
  @Input() classeFeriado;
  @Input() indexTab;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private _subsUf: Subscription;
  private _subsMunic: Subscription;
  private _subsFeriados: Subscription;

  feriado: Feriado[];
  feriadoDialog: Feriado;
  estado: UnidadeFederacao[];
  municipio: MunicipioByEstado[];
  nomeUF;
  nomeMunic;
  dadosObj;

  operation: ENOperation;
  dataSource: MatTableDataSource<Feriado>;
  refresh: Subject<any> = new Subject();

  titulo: string;
  botao: string;
  sizeContent: number;
  displayedColumns: string[] = ['id', 'descricao', 'classe', 'tipo', 'meta', 'estado', 'municipio', 'editar', 'deletar'];

  constructor(
    private _feriado: FeriadoService, public dialog: MatDialog, public snackBar: MatSnackBar, private _util: UtilService
  ) {}

  ngOnChanges() {
    if (this.diaCadastro !== undefined && this.indexTab === 1 && this.classeFeriado !== undefined) {
      console.log('inputs recebidos', this.diaCadastro, this.classeFeriado, this.indexTab, this.sizeContent);
      this.reloadFeriados();
    }
  }

  ngOnDestroy() {
    if (this._subsUf !== undefined) { this._subsUf.unsubscribe(); }
    if (this._subsMunic !== undefined) { this._subsMunic.unsubscribe(); }
  }

  reloadFeriados() {
    const mes = this.diaCadastro.split('/');
    console.log('mes', mes);
    this._subsFeriados = this._feriado.baixaListaFeriado(this.classeFeriado, mes[1]).subscribe(
      (data: Feriado[]) => {
        this.feriado = data.filter(x => x.dia === mes[0]);

        for (const key of this.feriado) {
          this.getUF(key.idEstado);
          this.getMunicipio(key.idEstado, key.idCodmunic);
          this.dadosObj = key.meta;
        }

        this.sizeContent = this.feriado.length;
        this.dataSource = new MatTableDataSource(this.feriado);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => console.error(err)
    );
  }

  getUF(estado: number) {
    if (estado === null) {
      return false;
    } else {
      this._subsUf = this._feriado.retornaUF().subscribe(
        (data: any[]) => {
          const uf = data.filter(x => x.idEstado === estado)[0];
          console.log('UF', uf);
          return this.nomeUF = uf.nome;
          /*for (const key of this.estado) {
            this.nomeUF = key.nome;
          }*/
        },
        err => console.error('ERROR UF ===>', err)
      );
    }
  }

  getMunicipio(estado: number, municipio: number) {
    if (estado === null && municipio === null) {
      return false;
    } else {
      this._subsMunic = this._feriado.retornaMunicipio(estado).subscribe(
        (data: any[]) => {
          this.municipio = data.filter(x => x.idCodmunic === municipio);
          for (const key of this.municipio) {
            this.nomeMunic = key.municipio;
          }
        },
        err => console.error('ERROR MUNIC ===>', err)
      );
    }
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filteredData);
  }

  goTo(id: number) {
    // this.mandaId.emit(id);
    this.operation = ENOperation.read;
    console.log('clicou no id', id, 'operação', this.operation);
  }

  create() {
    this.operation = ENOperation.create;
    const titulo = 'Cadastrar novo feriado/horário de pico';
    const btnDescricao = 'CRIAR';
    this.feriadoDialog = new Feriado();
    this.feriadoDialog.idFeriado = 0;
    console.log('CRIAR', this.feriadoDialog, 'operação', this.operation);
    this.openDialog(this.operation, titulo, btnDescricao, this.feriadoDialog);
  }

  edit(id: number) {
    this.operation = ENOperation.edit;
    const titulo = 'Editar feriado/horário de pico cadastrado';
    const btnDescricao = 'EDITAR';
    const pagedata = this.feriado.filter(x => x.idFeriado === id)[0];
    console.log('EDITAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  delete(id: number) {
    this.operation = ENOperation.delete;
    const titulo = 'Confirmação de exclusão do feriado/horário de pico';
    const btnDescricao = 'DELETAR';
    const pagedata = this.feriado.filter(x => x.idFeriado === id)[0];
    console.log('DELETAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  preview(id: number) {
    this.operation = ENOperation.preview;
    console.log('PREVIEW', id, 'operação', this.operation);
  }

  openDialog(opr: number, title: string, descr: string, obj: Feriado): void {
    const dialogRef = this.dialog.open(CadastroDialogComponent, {
      width: '600px',
      data: {dia: this.diaCadastro, classe: this.classeFeriado, operation: opr, tituloDialog: title, btnCustom: descr, object: obj}
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result.CodAction) {
        case ENOperation.create:
          if (result.CodRetorno > 0) {
            this._util.alertDialog(result.CodRetorno, result.MsgRetorno);
          } else {
            this.snackBar.open('Cadastro feito com sucesso', '', { duration: 2500 });
            this.reloadFeriados();
          }
        break;
        case ENOperation.edit:
          if (result.CodRetorno > 0) {
            this._util.alertDialog(result.CodRetorno, result.MsgRetorno);
          } else {
            this.snackBar.open('Cadastro atualizado com sucesso', '', { duration: 2500 });
            this.reloadFeriados();
            return this.sizeContent > 5 ? this.paginator.firstPage() : false;
          }
        break;
        case ENOperation.delete:
          if (result.CodRetorno > 0) {
            this._util.alertDialog(result.CodRetorno, result.MsgRetorno);
          } else {
            this.snackBar.open('Cadastro excluído com sucesso', '', { duration: 2500 });
            this.reloadFeriados();
            return this.sizeContent > 5 ? this.paginator.firstPage() : false;
          }
        break;
      }
    });
  }
}
