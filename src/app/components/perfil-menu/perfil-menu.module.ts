import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { PerfilMenuComponent } from './perfil-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule
  ],
  declarations: [
    PerfilMenuComponent
  ],
  exports: [
    PerfilMenuComponent
  ],
  entryComponents: [],
  providers: []
})
export class PerfilMenuModule { }
