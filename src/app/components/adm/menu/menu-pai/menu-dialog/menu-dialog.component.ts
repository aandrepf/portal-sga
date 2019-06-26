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
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.css']
})
export class MenuDialogComponent implements OnInit, OnDestroy {
  private _subDialog: Subscription;

  menuForm: FormGroup;
  resultAction: ResultAction;
  cadastraMenu: Menu;

  constructor(
    private _menu: MenuService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.menuForm = this.fb.group({
      id: [this.data.operation === ENOperation.create ? 0 : ''],
      id_menu_pai: [0],
      nome: ['', Validators.required],
      url: [''],
      cud: [0],
      id_cliente: [1],
      active: ['', Validators.required],
      posicao: ['', Validators.min(1)]
    });

    if (this.data.operation !== ENOperation.create) {
      this.menuForm.setValue({
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
  }

  onSubmit() {
    this.cadastraMenu = new Menu();
    this.cadastraMenu.id = this.menuForm.value.id;
    this.cadastraMenu.id_menu_pai = this.menuForm.value.id_menu_pai;
    this.cadastraMenu.nome = this.menuForm.value.nome;
    this.cadastraMenu.url = this.menuForm.value.url;
    this.cadastraMenu.cud = this.menuForm.value.cud;
    this.cadastraMenu.id_cliente = this.menuForm.value.id_cliente;
    this.cadastraMenu.active = this.menuForm.value.active ? 1 : 0;
    this.cadastraMenu.posicao = Number(this.menuForm.value.posicao);

    console.log('enviou os dados', this.cadastraMenu);

    switch (this.data.operation) {
      case ENOperation.create:
        this._subDialog = this._menu.create(this.cadastraMenu).subscribe(
          () => { this.dialogRef.close(this.data.operation); },
          err => console.error(err)
        );
      break;
      case ENOperation.edit:
        this._subDialog = this._menu.update(this.cadastraMenu.id, this.cadastraMenu).subscribe(
          () => { this.dialogRef.close(this.data.operation); },
          err => console.error(err)
        );
      break;
      case ENOperation.delete:
          this._subDialog = this._menu.delete(this.cadastraMenu.id).subscribe(
            () => { this.dialogRef.close(this.data.operation); },
            err => console.error(err)
          );
      break;
    }
  }

  setControlsState(isEnable: boolean) {
    isEnable ? this.menuForm.enable() : this.menuForm.disable();
  }

}
