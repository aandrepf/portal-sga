import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../shared/material.module';
import { PipesModule } from './../../../pipes/pipes.module';
import { DragulaModule } from 'ng2-dragula';

import { FilaUnicaComponent } from './fila-unica.component';
import { FilaUnicaCadastroComponent } from './fila-unica-cadastro/fila-unica-cadastro.component';
import { CadastroDialogComponent } from './fila-unica-cadastro/cadastro-dialog/cadastro-dialog.component';
import { FilaUnicaConfigsComponent } from './fila-unica-configs/fila-unica-configs.component';

import { FilasService } from 'src/app/services/filas.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule,
    DragulaModule
  ],
  declarations: [
    FilaUnicaComponent,
    FilaUnicaCadastroComponent,
    CadastroDialogComponent,
    FilaUnicaConfigsComponent
  ],
  exports: [
    FilaUnicaComponent
  ],
  entryComponents: [
    CadastroDialogComponent
  ],
  providers: [
    FilasService
  ]
})
export class FilaUnicaModule { }
