import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../shared/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { UsuariosComponent } from './usuarios.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule
  ],
  declarations: [
    UsuariosComponent
  ],
  exports: [
    UsuariosComponent
  ],
  entryComponents: [],
  providers: []
})
export class UsuariosModule { }
