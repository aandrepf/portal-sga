import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../shared/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { InterfaceComponent } from './interface.component';
import { InterfacePaginasComponent } from './interface-paginas/interface-paginas.component';
import { InterfaceDialogComponent } from './interface-paginas/interface-dialog/interface-dialog.component';
import { InterfaceTituloPaginaComponent } from './interface-titulo-pagina/interface-titulo-pagina.component';
import { InterfaceDialogTituloComponent } from './interface-titulo-pagina/interface-dialog-titulo/interface-dialog-titulo.component';
import { InterfaceLinksComponent } from './interface-links/interface-links.component';
import { InterfaceDialogLinksComponent } from './interface-links/interface-dialog-links/interface-dialog-links.component';
import { InterfaceTituloLinkComponent } from './interface-titulo-link/interface-titulo-link.component';
import {
  InterfaceDialogTiltulolinkComponent } from './interface-titulo-link/interface-dialog-tiltulolink/interface-dialog-tiltulolink.component';
import { InterfaceBotoesComponent } from './interface-botoes/interface-botoes.component';
import { InterfaceDialogBotoesComponent } from './interface-botoes/interface-dialog-botoes/interface-dialog-botoes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule
  ],
  declarations: [
    InterfaceComponent,
    InterfacePaginasComponent,
    InterfaceDialogComponent,
    InterfaceTituloPaginaComponent,
    InterfaceDialogTituloComponent,
    InterfaceLinksComponent,
    InterfaceDialogLinksComponent,
    InterfaceTituloLinkComponent,
    InterfaceDialogTiltulolinkComponent,
    InterfaceBotoesComponent,
    InterfaceDialogBotoesComponent
  ],
  exports: [
    InterfaceComponent
  ],
  entryComponents: [
    InterfaceDialogComponent,
    InterfaceDialogTituloComponent,
    InterfaceDialogLinksComponent,
    InterfaceDialogTiltulolinkComponent,
    InterfaceDialogBotoesComponent
  ]
})
export class InterfaceModule { }
