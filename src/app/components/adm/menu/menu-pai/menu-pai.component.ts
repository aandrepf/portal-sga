import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ENOperation } from 'src/app/models/enum';

import { Menu } from 'src/app/models/menu.model';
import { MenuService } from 'src/app/services/menu.service';

import { MenuDialogComponent } from './menu-dialog/menu-dialog.component';

@Component({
  selector: 'app-menu-pai',
  templateUrl: './menu-pai.component.html',
  styleUrls: ['./menu-pai.component.css']
})
export class MenuPaiComponent implements OnInit, OnDestroy {
  @Output() mandaIdMenuPai: EventEmitter<number> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _subsmenu: Subscription;

  public operation: ENOperation;
  public menu: Menu[];
  public menuDialog: Menu;

  public dataSource: MatTableDataSource<Menu>;

  public load = false;
  public titulo: string;
  public botao: string;
  public sizeContent: number;
  public displayedColumns: string[] = ['id', 'nome', 'active', 'posicao', 'editar', 'deletar'];

  constructor(
    private _menu: MenuService, private spinner: NgxSpinnerService, public dialog: MatDialog, public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.listaMenu();
  }

  ngOnDestroy() {
    if (this._subsmenu !== undefined) { this._subsmenu.unsubscribe(); }
  }

  listaMenu() {
    this._subsmenu = this._menu.getMenu().subscribe(
      (data: Menu[]) => {
        this.menu = data.filter(item => item.id_menu_pai === 0);
        this.sizeContent = this.menu.length;
        this.dataSource = new MatTableDataSource(this.menu);
        this.dataSource.paginator = this.paginator;
      },
      err => console.error('Error Menu', err)
    );
  }

  goTo(id: number) {
    this.mandaIdMenuPai.emit(id);
    this.operation = ENOperation.read;
    console.log('clicou no id', id, 'operação', this.operation);
  }

  create() {
    this.operation = ENOperation.create;
    const titulo = 'Cadastrar Menu';
    const btnDescricao = 'CRIAR';
    this.menuDialog = new Menu();
    this.menuDialog.id = 0;
    console.log('CRIAR', this.menuDialog, 'operação', this.operation);
    this.openDialog(this.operation, titulo, btnDescricao, this.menuDialog);
  }

  edit(id: number) {
    this.operation = ENOperation.edit;
    const titulo = 'Editar Menu';
    const btnDescricao = 'EDITAR';
    const pagedata = this.menu.filter(x => x.id === id)[0];
    console.log('EDITAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  delete(id: number) {
    this.operation = ENOperation.delete;
    const titulo = 'Confirmação de exclusão de Menu';
    const btnDescricao = 'DELETAR';
    const pagedata = this.menu.filter(x => x.id === id)[0];
    console.log('DELETAR', id, 'operação', this.operation, pagedata);
    this.openDialog(this.operation, titulo, btnDescricao, pagedata);
  }

  openDialog(opr: number, title: string, descr: string, obj: Menu): void {
    const dialogRef = this.dialog.open(MenuDialogComponent, {
      width: '600px',
      data: { operation: opr, tituloDialog: title, btnCustom: descr, object: obj}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === ENOperation.create) {
        this.snackBar.open('Cadastro feito com sucesso', '', { duration: 2500 });
        this.listaMenu();
      } else if (result === ENOperation.edit) {
        this.snackBar.open('Cadastro atualizado com sucesso', '', { duration: 2500 });
        this.listaMenu();
        return this.sizeContent > 5 ? this.paginator.firstPage() : false;
      } else if (result === ENOperation.delete) {
        this.snackBar.open('Cadastro excluído com sucesso', '', { duration: 2500 });
        this.listaMenu();
        return this.sizeContent > 5 ? this.paginator.firstPage() : false;
      }
    });
  }
}
