import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfilUsuario, NivelUnidade } from 'src/app/models/usuarios.model';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ENOperation } from 'src/app/models/enum';
import { Global } from 'src/app/models/global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultAction } from 'src/app/models/config';

export interface DialogData {
  operation: number;
  tituloDialog: string;
  btnCustom: string;
  object: PerfilUsuario;
}

@Component({
  selector: 'app-perfil-dialog',
  templateUrl: './perfil-dialog.component.html',
  styleUrls: ['./perfil-dialog.component.css']
})
export class PerfilDialogComponent implements OnInit, OnDestroy {
  private _subDialog: Subscription;
  private _subsNU: Subscription;

  public perfilGroup: FormGroup;
  public resultAction: ResultAction;
  public perfilData: PerfilUsuario;
  public nu: NivelUnidade[];

  constructor(
    private _usuario: UsuarioService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PerfilDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.listaNU();

    this.perfilGroup = this.fb.group({
      id: [this.data.operation === ENOperation.create ? 0 : ''],
      descr: ['', Validators.required],
      nivel_unidade: ['', Validators.required]
    });

    if (this.data.operation !== ENOperation.create) {
      this.perfilGroup.setValue({
        id: this.data.object.id,
        descr: this.data.object.descr,
        nivel_unidade: this.data.object.nivel_unidade
      });
    }

    this.setControlsState(this.data.operation === ENOperation.delete ? false : true);
  }

  ngOnDestroy() {
    if (this._subsNU !== undefined) { this._subsNU.unsubscribe(); }
    if (this._subDialog !== undefined) { this._subDialog.unsubscribe(); }
  }

  listaNU() {
    this._subsNU = this._usuario.getNU().subscribe(
      (data: NivelUnidade[]) => {
        this.nu = data;
      },
      err => console.error(err)
    );
  }

  onSubmit() {
    this.perfilData = new PerfilUsuario();
    this.perfilData.id = this.perfilGroup.value.id;
    this.perfilData.descr = this.perfilGroup.value.descr;
    this.perfilData.nivel_unidade = this.perfilGroup.value.nivel_unidade;

    console.log('dados para envio: ', this.perfilData);

    switch (this.data.operation) {
      case ENOperation.create:
        this._subDialog = this._usuario.create(this.perfilData).subscribe(
          () => { this.dialogRef.close(this.data.operation); },
          err => console.error(err)
        );
      break;
      case ENOperation.edit:
        this._subDialog = this._usuario.update(this.perfilData.id, this.perfilData).subscribe(
          () => { this.dialogRef.close(this.data.operation); },
          err => console.error(err)
        );
      break;
      case ENOperation.delete:
          this._subDialog = this._usuario.delete(this.perfilData.id).subscribe(
            () => { this.dialogRef.close(this.data.operation); },
            err => console.error(err)
          );
      break;
    }

  }

  setControlsState(isEnable: boolean) {
    isEnable ? this.perfilGroup.enable() : this.perfilGroup.disable();
  }
}
