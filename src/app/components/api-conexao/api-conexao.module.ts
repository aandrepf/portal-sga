import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../shared/material.module';

import { ConexaoService } from 'src/app/services/conexao.service';

import { AppPasswordDirective } from './password.directive';

import { ApiConexaoComponent } from './api-conexao.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    AppPasswordDirective,
    ApiConexaoComponent
  ],
  exports: [
    ApiConexaoComponent
  ],
  providers: [
    ConexaoService
  ]
})
export class ApiConexaoModule { }
