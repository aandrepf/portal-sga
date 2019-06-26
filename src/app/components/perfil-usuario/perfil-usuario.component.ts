import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

import { UsuarioService } from 'src/app/services/usuario.service';
import { PerfilUsuario } from 'src/app/models/usuarios.model';
import { ENOperation } from 'src/app/models/enum';
import { PerfilDialogComponent } from './perfil-dialog/perfil-dialog.component';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private subsperfil: Subscription;

  public operation: ENOperation;
  public perfil: PerfilUsuario[];
  public perfilDialog: PerfilUsuario;

  public dataSource: MatTableDataSource<PerfilUsuario>;

  public load = false;
  public titulo: string;
  public botao: string;
  public sizeContent: number;
  public displayedColumns: string[] = ['id', 'descricao', 'editar', 'deletar'];

  constructor(
    private spinner: NgxSpinnerService, private _usuario: UsuarioService, public dialog: MatDialog, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.load = true;
      this.listaPerfilUsuario();
    }, 1500);
  }

  ngOnDestroy() {
    if (this.subsperfil !== undefined) { this.subsperfil.unsubscribe(); }
  }

  listaPerfilUsuario() {
    this.subsperfil = this._usuario.getPerfilUsuario().subscribe(
      (data: PerfilUsuario[]) => {
        this.perfil = data;
        this.sizeContent = this.perfil.length;
        this.dataSource = new MatTableDataSource(this.perfil);
        this.dataSource.paginator = this.paginator;
        console.log(this.perfil);
      },
      err => console.error('Error Perfil', err)
    );
  }

  create() {
    this.operation = ENOperation.create;
    const titulo = 'Cadastrar perfil de usuário';
    const btnDescricao = 'CRIAR';
    this.perfilDialog = new PerfilUsuario();
    this.perfilDialog.id = 0;
    console.log('CRIAR', this.perfilDialog, 'operação', this.operation);
    this.openDialog(this.operation, titulo, btnDescricao, this.perfilDialog);
  }

  edit(id: number) {
    this.operation = ENOperation.edit;
    const titulo = 'Editar perfil de usuário';
    const btnDescricao = 'EDITAR';
    const pagedata = this.perfil.filter(x => x.id === id)[0];
    console.log('EDITAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  delete(id: number) {
    this.operation = ENOperation.delete;
    const titulo = 'Confirmação de exclusão do perfil';
    const btnDescricao = 'DELETAR';
    const pagedata = this.perfil.filter(x => x.id === id)[0];
    console.log('DELETAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  openDialog(opr: number, title: string, descr: string, obj: PerfilUsuario): void {
    const dialogRef = this.dialog.open(PerfilDialogComponent, {
      width: '600px',
      data: { operation: opr, tituloDialog: title, btnCustom: descr, object: obj}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === ENOperation.create) {
        this.snackBar.open('Cadastro feito com sucesso', '', { duration: 2500 });
        this.listaPerfilUsuario();
      } else if (result === ENOperation.edit) {
        this.snackBar.open('Cadastro atualizado com sucesso', '', { duration: 2500 });
        this.listaPerfilUsuario();
        return this.sizeContent > 5 ? this.paginator.firstPage() : false;
      } else if (result === ENOperation.delete) {
        this.snackBar.open('Cadastro excluído com sucesso', '', { duration: 2500 });
        this.listaPerfilUsuario();
        return this.sizeContent > 5 ? this.paginator.firstPage() : false;
      }
    });
  }
}
