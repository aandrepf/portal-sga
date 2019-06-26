import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../shared/material.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PipesModule } from './../../../pipes/pipes.module';

import { FeriadoComponent } from './feriado.component';

import { FeriadoService } from './../../../services/feriado.service';
import { FeriadoCalendarioComponent } from './feriado-calendario/feriado-calendario.component';
import { FeriadoCadastroComponent } from './feriado-cadastro/feriado-cadastro.component';
import { CadastroDialogComponent } from './feriado-cadastro/cadastro-dialog/cadastro-dialog.component';
import { FeriadoHeaderComponent } from './feriado-header/feriado-header.component';
import { FeriadoFilterComponent } from './feriado-filter/feriado-filter.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [
    FeriadoComponent,
    FeriadoCalendarioComponent,
    FeriadoCadastroComponent,
    FeriadoHeaderComponent,
    FeriadoFilterComponent,
    CadastroDialogComponent
  ],
  exports: [
    FeriadoComponent
  ],
  entryComponents: [
    CadastroDialogComponent
  ],
  providers: [
    FeriadoService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class FeriadoModule { }
