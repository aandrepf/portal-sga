import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../shared/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { IncidentesService } from './../../../services/incidentes.service';

import { IncidentesComponent } from './incidentes.component';
import { IncidentesDialogComponent } from './incidentes-dialog/incidentes-dialog.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule
  ],
  declarations: [
    IncidentesComponent,
    IncidentesDialogComponent
  ],
  exports: [
    IncidentesComponent
  ],
  providers: [
    IncidentesService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  entryComponents: [
    IncidentesDialogComponent
  ]
})
export class IncidentesModule { }
