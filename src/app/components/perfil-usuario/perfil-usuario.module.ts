import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { UsuarioService } from 'src/app/services/usuario.service';

import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { PerfilDialogComponent } from './perfil-dialog/perfil-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule
  ],
  declarations: [
    PerfilUsuarioComponent,
    PerfilDialogComponent
  ],
  exports: [
    PerfilUsuarioComponent
  ],
  entryComponents: [
    PerfilDialogComponent
  ],
  providers: [UsuarioService]
})
export class PerfilUsuarioModule { }
