import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MenuService } from './../../../../../services/menu.service';
import { Menu } from 'src/app/models/menu.model';

import { ENOperation } from 'src/app/models/enum';
import { Subscription } from 'rxjs';
import { ResultAction } from 'src/app/models/config';

export interface DialogData {
  operation: number;
  tituloDialog: string;
  btnCustom: string;
  object: Menu;
}

@Component({
  selector: 'app-sub-menu-dialog',
  templateUrl: './sub-menu-dialog.component.html',
  styleUrls: ['./sub-menu-dialog.component.css']
})
export class SubMenuDialogComponent implements OnInit, OnDestroy {
  private _subDialog: Subscription;
  private _subMenuPai: Subscription;

  submenuForm: FormGroup;
  resultAction: ResultAction;
  cadastraSubMenu: Menu;
  listaMenu: Menu[];

  constructor(
    private _menu: MenuService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SubMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.listaSubMenu();

    this.submenuForm = this.fb.group({
      id: [this.data.operation === ENOperation.create ? 0 : ''],
      id_menu_pai: [this.data.object.id_menu_pai],
      nome: ['', Validators.required],
      url: [''],
      cud: [0],
      id_cliente: [1],
      active: ['', Validators.required],
      posicao: ['', Validators.min(1)]
    });

    if (this.data.operation !== ENOperation.create) {
      this.submenuForm.setValue({
        id: this.data.object.id,
        id_menu_pai: this.data.object.id_menu_pai,
        nome: this.data.object.nome,
        url: this.data.object.url,
        cud: this.data.object.cud,
        id_cliente: this.data.object.id_cliente,
        active: this.data.object.active,
        posicao: this.data.object.posicao
      });
    }

    this.setControlsState(this.data.operation === ENOperation.delete ? false : true);
  }

  ngOnDestroy() {
    if (this._subDialog !== undefined) { this._subDialog.unsubscribe(); }
    if (this._subMenuPai !== undefined) { this._subMenuPai.unsubscribe(); }
  }

  listaSubMenu() {
    this._subMenuPai = this._menu.getMenu().subscribe(
      (data: Menu[]) => {
        this.listaMenu = data.filter(item => item.id_menu_pai === 0);
      },
      err => console.error('Error Menu', err)
    );
  }

  onSubmit() {
    this.cadastraSubMenu = new Menu();
    this.cadastraSubMenu.id = this.submenuForm.value.id;
    this.cadastraSubMenu.id_menu_pai = this.submenuForm.value.id_menu_pai;
    this.cadastraSubMenu.nome = this.submenuForm.value.nome;
    this.cadastraSubMenu.url = this.submenuForm.value.url;
    this.cadastraSubMenu.cud = this.submenuForm.value.cud ? 1 : 0;
    this.cadastraSubMenu.id_cliente = this.submenuForm.value.id_cliente;
    this.cadastraSubMenu.active = this.submenuForm.value.active ? 1 : 0;
    this.cadastraSubMenu.posicao = Number(this.submenuForm.value.posicao);

    console.log('enviou os dados', this.cadastraSubMenu);

    switch (this.data.operation) {
      case ENOperation.create:
        this._subDialog = this._menu.create(this.cadastraSubMenu).subscribe(
          () => { this.dialogRef.close(this.data.operation); },
          err => console.error(err)
        );
      break;
      case ENOperation.edit:
        this._subDialog = this._menu.update(this.cadastraSubMenu.id, this.cadastraSubMenu).subscribe(
          () => { this.dialogRef.close(this.data.operation); },
          err => console.error(err)
        );
      break;
      case ENOperation.delete:
          this._subDialog = this._menu.delete(this.cadastraSubMenu.id).subscribe(
            () => { this.dialogRef.close(this.data.operation); },
            err => console.error(err)
          );
      break;
    }
  }

  setControlsState(isEnable: boolean) {
    isEnable ? this.submenuForm.enable() : this.submenuForm.disable();
  }
}
